export const fetchUser = () => {
  const userInfo =
    localStorage.getItem('tavelstory-user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('tavelstory-user'))
      : localStorage.clear();
  return userInfo;
};
