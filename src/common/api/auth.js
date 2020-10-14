import { axios } from './axios';

export function signIn(firebaseToken) {
  return axios.post('/v1/auth/token', { token: firebaseToken });
}

export function signOut() {
  return axios.post('/v1/auth/revoke');
}
