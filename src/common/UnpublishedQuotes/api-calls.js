import { axios } from 'common/axios';

export function fetchUser(userId) {
  return axios.get(`/v1/users/${userId}`);
}
