//LOCAL STORAGE

//USER
export const setUserToLocal = (user,token) => { //user=>object
  localStorage.setItem("user", JSON.stringify(user)); //direct object support nagareko bhayera 'stingify' garera halna parcha
  localStorage.setItem("token", token);
}

export const getUserFromLocal = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null //object form ma return garne 'parse' gareko
}
export const removeUserFromLocal = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}
