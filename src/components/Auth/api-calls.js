import axios from "../axios";

async function signIn(firebaseToken) {
  let endPoint = "/v1/auth/token";
  const payload = { token: firebaseToken };

  return new Promise(async function(resolve, reject) {
    try {
      const response = await axios.post(endPoint, payload);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export { signIn };
