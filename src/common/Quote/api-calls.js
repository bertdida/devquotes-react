import { axios } from 'common/axios';

export function deleteQuote(id) {
  return axios.delete(`/v1/quotes/${id}`);
}

export function likeQuote(quote) {
  return axios.post('/v1/likes', { ...quote });
}

export function unlikeQuote(quote) {
  return axios.delete(`/v1/likes/${quote.id}`);
}
