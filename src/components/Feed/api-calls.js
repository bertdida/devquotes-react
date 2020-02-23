import axios from "../axios";

async function fetchQuotes(page) {
  const endPoint = "/v1/quotes?page=" + page;

  return new Promise(async function(resolve, reject) {
    try {
      const response = await axios.get(endPoint);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

async function fetchLikedQuotes(page) {
  const endPoint = "/v1/me/likes?page=" + page;

  return new Promise(async function(resolve, reject) {
    try {
      const response = await axios.get(endPoint);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

async function deleteQuote(id) {
  const endPoint = "/v1/quotes/" + id;

  return new Promise(async function(resolve, reject) {
    try {
      const response = await axios.delete(endPoint);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

async function fetchQuote(id) {
  const endPoint = "/v1/quotes/" + id;

  return new Promise(async function(resolve, reject) {
    try {
      const response = await axios.get(endPoint);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

async function updateQuote(quote) {
  const endPoint = "/v1/quotes/" + quote.id;
  const payload = { ...quote };

  return new Promise(async function(resolve, reject) {
    try {
      const response = await axios.patch(endPoint, payload);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export { fetchQuotes, fetchLikedQuotes, deleteQuote, fetchQuote, updateQuote };
