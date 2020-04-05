import axios from 'common/axios';

export function signIn(firebaseToken) {
  return axios.post('/v1/auth/token', { token: firebaseToken });
}
