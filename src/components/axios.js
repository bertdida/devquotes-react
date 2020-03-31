import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create();
let isRefreshing = false;
let subscribers = [];

instance.interceptors.request.use(config => {
  const access_token = Cookies.get("csrf_access_token");

  if (access_token) {
    config.headers["x-csrf-token"] = access_token;
  }

  return config;
});

instance.interceptors.response.use(
  response => response,
  async error => {
    const status = error.response ? error.response.status : null;

    if (status !== 401) {
      return Promise.reject(error);
    }

    const requestSubscribers = new Promise(resolve => {
      // store failed requests
      addSubscriber(access_token => {
        error.response.config.headers["x-csrf-token"] = access_token;
        resolve(axios(error.response.config));
      });
    });

    if (!isRefreshing) {
      isRefreshing = true;
      const refresh_token = Cookies.get("csrf_refresh_token");
      try {
        await axios({
          method: "POST",
          url: "/v1/auth/refresh",
          headers: { "x-csrf-token": refresh_token }
        });

        const access_token = Cookies.get("csrf_access_token");
        onAccessTokenFetched(access_token); // retry failed requests
        isRefreshing = false;
      } catch (error) {
        console.log(error.response);
      }
    }

    return requestSubscribers;
  }
);

function addSubscriber(callback) {
  subscribers.push(callback);
}

function onAccessTokenFetched(access_token) {
  subscribers = subscribers.filter(callback => callback(access_token));
}

export default instance;
