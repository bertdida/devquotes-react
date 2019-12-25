import axios from "../axios";

async function createQuote(quote) {
  const endPoint = "/v1/quotes";
  const payload = { ...quote };

  return new Promise(async function(resolve, reject) {
    try {
      const response = await axios.post(endPoint, payload);
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

export { createQuote, updateQuote, fetchQuote };
