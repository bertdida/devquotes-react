import axios from "../axios";

async function signOut() {
  const endPoint = "/v1/auth/revoke";

  return new Promise(async function(resolve, reject) {
    try {
      const response = await axios.post(endPoint);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export { signOut };
