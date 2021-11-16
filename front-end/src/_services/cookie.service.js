// function setCookie(cname, cvalue, exdays) {
//     const d = new Date();
//     d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//     let expires = "expires=" + d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// };

export const getCookie = (cookieName) => {
  const searchText = `${cookieName}=`;
  // handle special characters like $
  const decodedCookie = decodeURIComponent(document.cookie);
  // split into array of individual cookies
  const cookieArray = decodedCookie ? decodedCookie.split(";") : [];
  // return only value of the one we're looking for
  if (cookieArray.length > 0) {
    const cookie = cookieArray.filter((ck) => ck.toString().includes(searchText))[0];
    return cookie.split("=")[1];
  } return null;
};

export const checkCookie = (cookieName) => {
  const cookie = getCookie(cookieName);
  if (cookie !== "") return cookie;
  return null;
};
