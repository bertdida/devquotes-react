import { axios } from 'common/axios';

export function fetchQuotes(page) {
  return axios.get(`/v1/quotes?status=pending_review&page=${page}&per_page=25`);
}
