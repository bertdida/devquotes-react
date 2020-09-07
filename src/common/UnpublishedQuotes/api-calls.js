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

export function fetchQuotes({ page, filters = null }) {
  if (filters === null) {
    return axios.get(`/v1/quotes?page=${page}`);
  }

  const params = filters.map(queryString.stringify).join('&');
  return axios.get(`/v1/quotes?${params}&page=${page}`);
}
