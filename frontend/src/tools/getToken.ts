export function getToken() {
  const token = localStorage.getItem("@to-do-list/user-token");


  return token ? true : false;
}