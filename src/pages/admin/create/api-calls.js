import { axios } from 'common/axios';

export function createQuote(quote) {
  return axios.post('/v1/quotes', { ...quote });
}
