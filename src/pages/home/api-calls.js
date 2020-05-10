import { axios } from 'common/axios';

export function fetchRandomQuote() {
  return axios.get('/v1/quotes/random');
}
