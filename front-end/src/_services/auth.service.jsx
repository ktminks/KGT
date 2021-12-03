import React, { useEffect, useState, useCallback } from "react";

import KittenDataService from "./data.service";
import { loginLink } from "./address.service";

const useAuthStatus = () => {
  const [userName, setUserName] = useState("");
  const [loginButton, setLoginButton] = useState(null);
  const [logoutButton, setLogoutButton] = useState(null);

  const getLoginStatus = useCallback(() => {
    const greeting = <span className="nav-link">{`Hi, ${userName}!`}</span>;
    const loginTag = <a href={loginLink} className="nav-link">Login with Google</a>;

    const reset = () => {
      setUserName("");
      localStorage.clear();
      setLoginButton(loginTag);
      setLogoutButton(null);
    //   clearCookies();
    };

    const onLogout = () => KittenDataService.logout().then(() => reset());
    const logoutTag = <button className="nav-link" type="button" onClick={() => onLogout()}>Logout</button>;
    KittenDataService.isLoggedIn()
      .then((res) => {
        // console.log(res.data);
        const { loggedIn, user } = res.data;
        if (loggedIn) {
          const { name } = user;
          setUserName(name.givenName || name);
          setLoginButton(greeting);
          setLogoutButton(logoutTag);
        } else onLogout();
      }).catch((err) => { console.error(err); });
  }, [userName]);

  useEffect(() => {
    getLoginStatus();
  }, [getLoginStatus]);
  return { loginButton, logoutButton };
};

export default useAuthStatus;
