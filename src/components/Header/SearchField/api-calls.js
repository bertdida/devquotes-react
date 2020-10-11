import { axios } from 'common/axios';

export function searchQuote(query) {
  return axios.get(`/v1/quotes/?query=${query}`);
}
