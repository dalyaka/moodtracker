import BaseApi from '../common/api/BaseApi';

export class AuthApi extends BaseApi {
  getCurrentUser = () => this.get('/auth/user');

  login = ({ login, password }) =>
    this.post('/auth/login', { login, password });

  signup = ({ login, password, name }) =>
    this.post('/auth/signup', { login, password, name });

  logout = () => this.post('/auth/logout');
}

export const authApi = new AuthApi();
