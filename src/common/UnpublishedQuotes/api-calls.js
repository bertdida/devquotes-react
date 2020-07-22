import { axios } from 'common/axios';

export function fetchUser(userId, config = {}) {
  return axios.get(`/v1/users/${userId}`, config);
}
