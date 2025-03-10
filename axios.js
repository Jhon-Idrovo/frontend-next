import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000/"
    : "https://backend-1-410a8b404e22.herokuapp.com/";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers:
    typeof window !== "undefined"
      ? {
          Authorization: localStorage.getItem("access_token")
            ? "JWT " + localStorage.getItem("access_token")
            : null,
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      : null,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    //IF THE SERVER ISN'T WORKING
    if (typeof error.response === "undefined") {
      alert(
        "A server/network error occurred. " +
          "Looks like CORS might be the problem. " +
          "Sorry about this - we will get it fixed shortly.",
      );
      return Promise.reject(error);
    }
    //if the refresh token has expired redirect to login
    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + "/api/token/refresh/"
    ) {
      window.location.href = "/login/";
      return Promise.reject(error);
    }

    //if the access token has expired
    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        const tokenParts = JSON.parse(
          Buffer.from(refreshToken.split(".")[1], "base64").toString(),
        );

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);

        if (tokenParts.exp > now) {
          return axiosInstance
            .post("/api/token/refresh/", { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem("access_token", response.data.access);
              // localStorage.setItem("refresh_token", response.data.refresh);

              axiosInstance.defaults.headers["Authorization"] =
                "JWT " + response.data.access;
              originalRequest.headers["Authorization"] =
                "JWT " + response.data.access;

              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          window.location.href = "/login/";
        }
      } else {
        console.log("Refresh token not available.");
        window.location.href = "/login/";
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  },
);

export default axiosInstance;
