import { axios } from './axios';

export function fetchLikes({ page }) {
  return axios.get(`/v1/likes?page=${page}`);
}

export function likeQuote(id) {
  return axios.post('/v1/likes', { id });
}

export function unlikeQuote(id) {
  return axios.delete(`/v1/likes/${id}`);
}
