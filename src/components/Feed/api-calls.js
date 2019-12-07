import axios from "axios";

async function fetchQuotes() {
  const endPoint = "/v1/quotes";

  return new Promise(async function(resolve, reject) {
    try {
      const response = await axios.get(endPoint);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export { fetchQuotes };
