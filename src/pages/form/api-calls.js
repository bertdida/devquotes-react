import axios from 'common/axios';

export function createQuote(quote) {
  return axios.post('/v1/quotes', { ...quote });
}

export function updateQuote(quote) {
  return axios.patch(`/v1/quotes/${quote.id}`, { ...quote });
}

export function fetchQuote(id) {
  return axios.get(`/v1/quotes/${id}`);
}
