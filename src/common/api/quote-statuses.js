import { axios } from './axios';

export function fetchQuoteStatuses() {
  return axios.get('/v1/quote-statuses');
}
