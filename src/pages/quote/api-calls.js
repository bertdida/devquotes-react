import { axios } from 'common/axios';

export function fetchQuote(id) {
  return axios.get(`/v1/quotes/${id}`);
}
