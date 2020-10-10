import { axios } from 'common/axios';
import queryString from 'query-string';

export function fetchUser(userId, config = {}) {
  return axios.get(`/v1/users/${userId}`, config);
}

export function updateQuote(quote) {
  return axios.patch(`/v1/quotes/${quote.id}`, { ...quote });
}

export function fetchQuoteContributor(quote, config = {}) {
  return axios.get(`/v1/quotes/${quote.id}/contributor`, config);
}

export function fetchQuoteStatuses() {
  return axios.get('/v1/quote-statuses');
}

export function fetchQuotes(params) {
  const _params = [params].map(queryString.stringify).join('&');
  return axios.get(`/v1/quotes?${_params}`);
}

export function deleteQuotes(ids) {
  return axios.delete(`/v1/quotes?ids=${ids.join(',')}`);
}

export function deleteQuote(id) {
  return axios.delete(`/v1/quotes/${id}`);
}
