import { axios } from './axios';

export function fetchLikes(page) {
  return axios.get(`/v1/likes?page=${page}`);
}

export function likeQuote(quote) {
  return axios.post('/v1/likes', { ...quote });
}

export function unlikeQuote(quote) {
  return axios.delete(`/v1/likes/${quote.id}`);
}
