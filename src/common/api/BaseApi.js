import ApiClient from './ApiClient';
import { tokenStorage } from '../TokenStorage';
import settings from '../settings';

export default class BaseApi {
  constructor(client) {
    this.client = client || new ApiClient(settings.apiUrl, tokenStorage);
  }

  get = (...args) => this.client.get(...args);

  post = (...args) => this.client.post(...args);

  postForm = (...args) => this.client.postForm(...args);

  delete = (...args) => this.client.delete(...args);
}
