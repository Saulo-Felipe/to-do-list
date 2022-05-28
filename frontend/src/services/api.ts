import axios from "axios";

type TokenResponse = {
  invalidToken?: boolean;
}

export const api = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? process.env.REACT_APP_SERVER_URL_dev : process.env.REACT_APP_SERVER_URL_prod
});

api.defaults.headers.common["token"] = localStorage.getItem("@to-do-list/user-token") || "no-token";

api.interceptors.response.use((response) => {
  var data: TokenResponse = response.data;

  if (data.invalidToken) {
    localStorage.removeItem("@to-do-list/user-token");    
  }

  return response;
})