import { axios } from 'common/axios';

export function fetchUser(userId, config = {}) {
  return axios.get(`/v1/users/${userId}`, config);
}

export function updateQuote(quote) {
  return axios.patch(`/v1/quotes/${quote.id}`, { ...quote });
}

export function fetchQuoteContributor(quote, config = {}) {
  return axios.get(`/v1/quotes/${quote.id}/contributor`, config);
}
