import axios from "axios";

export const api = axios.create({
  baseURL: "https://8081-saulofelipe-todolist-mubykx0n5jn.ws-us44.gitpod.io"
});

api.defaults.headers.common["token"] = localStorage.getItem("@to-do-list/user-token") || "no-token";

