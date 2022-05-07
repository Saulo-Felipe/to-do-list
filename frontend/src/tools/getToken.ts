export function getToken() {
  const token = localStorage.getItem("@to-do-list/user-token");

  if (token) return true;
  else return false;
}