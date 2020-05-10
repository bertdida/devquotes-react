import { axios } from 'common/axios';

export function searchQuotes(query) {
  return axios.get(`/v1/quotes?q=${query}`);
}
