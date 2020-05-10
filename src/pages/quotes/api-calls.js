import { axios } from 'common/axios';

export function fetchQuotes(page) {
  return axios.get(`/v1/quotes?page=${page}`);
}
