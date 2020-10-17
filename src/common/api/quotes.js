import queryString from 'query-string';
import { axios } from './axios';

export function fetchQuotes(queryParams) {
  const params = [queryParams].map(queryString.stringify).join('&');
  return axios.get(`/v1/quotes?${params}`);
}

export function fetchQuote(id) {
  return axios.get(`/v1/quotes/${id}`);
}

export function fetchRandomQuote() {
  return axios.get('/v1/quotes/random');
}

export function createQuote(quote) {
  return axios.post('/v1/quotes', { ...quote });
}

export function updateQuote(quote) {
  return axios.patch(`/v1/quotes/${quote.id}`, { ...quote });
}

export function deleteQuote(id) {
  return axios.delete(`/v1/quotes/${id}`);
}

export function deleteQuotes(ids) {
  return axios.delete(`/v1/quotes?ids=${ids.join(',')}`);
}

export function fetchQuoteContributor(id, config = {}) {
  return axios.get(`/v1/quotes/${id}/contributor`, config);
}

export function searchQuote(query) {
  return axios.get(`/v1/quotes/?query=${query}`);
}
