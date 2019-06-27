import ApiError from './ApiError';

const encodeUrlParams = query => {
  if (query === null || query === undefined) {
    return '';
  }
  return Reflect.ownKeys(query)
    .filter(key => query[key] !== undefined && query[key] !== null)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
    .join('&');
};

export default class ApiClient {
  constructor(apiUrl, tokenStorage) {
    this.apiUrl = apiUrl;
    this.tokenStorage = tokenStorage;
  }

  get = (endpoint, query) => {
    const params = query ? encodeUrlParams(query) : '';
    const url = `${this.apiUrl}${endpoint}${params && `?${params}`}`;
    return fetch(url, this.getReqSettings('GET')).then(this.processResponse);
  };

  post = (endpoint, payload) => {
    const url = `${this.apiUrl}${endpoint}`;
    const body = JSON.stringify(payload);
    const reqparams = { body, ...this.getReqSettings('POST') };
    return fetch(url, reqparams).then(this.processResponse);
  };

  postForm = (endpoint, body) => {
    const url = `${this.apiUrl}${endpoint}`;
    return fetch(url, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      cache: 'no-cache',
      body,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${this.tokenStorage.get()}`,
      },
    }).then(this.processResponse);
  };

  delete = endpoint => {
    const url = `${this.apiUrl}${endpoint}`;
    return fetch(url, this.getReqSettings('DELETE')).then(this.processResponse);
  };

  getReqSettings = method => {
    const headers = {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
    };
    const token = this.tokenStorage.get();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return {
      method,
      credentials: 'include',
      mode: 'cors',
      cache: 'no-cache',
      headers,
    };
  };

  processResponse = async response => {
    const text = await response.text();
    let json = null;
    try {
      json = text.length ? JSON.parse(text) : null;
    } catch (e) {
      throw new ApiError(e.message || '', response.status);
    }

    if (json && json.error) {
      throw new ApiError(json.error || '', response.status);
    }
    if (response.status < 200 || response.status >= 400) {
      throw new ApiError(json || '', response.status);
    }
    return json;
  };
}
