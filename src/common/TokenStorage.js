import AsyncStorage from '@react-native-community/async-storage';

export class TokenStorage {
  static tokenKey = 'jwt-token';

  token = null;

  get = () => {
    return this.token;
  };

  set = async token => {
    try {
      await AsyncStorage.setItem(TokenStorage.tokenKey, token);
      this.token = token;
      // eslint-disable-next-line no-empty
    } catch {}
  };

  restore = async () => {
    try {
      this.token = await AsyncStorage.getItem(TokenStorage.tokenKey);
      // eslint-disable-next-line no-empty
    } catch {}
  };

  remove = async () => {
    try {
      await AsyncStorage.removeItem(TokenStorage.tokenKey);
      this.token = null;
      // eslint-disable-next-line no-empty
    } catch {}
  };
}

export const tokenStorage = new TokenStorage();
