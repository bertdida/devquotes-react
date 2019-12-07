import axios from "axios";

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

export { createQuote };
