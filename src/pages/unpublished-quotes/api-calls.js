import { axios } from 'common/axios';

export function fetchQuotes(page) {
  return axios.get(`/v1/quotes?is_published=false&page=${page}&per_page=25`);
}
