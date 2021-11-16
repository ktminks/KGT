import React, { useState, useEffect } from "react";
import * as Alert from "../alerts/alerts";
import KittenDataService from "../../_services/data.service";
import { loginLink } from "../../_services/address.service";
// import { Link } from "react-router-dom";

const LoginButton = ({ updateDisplayFromLocal }) => {
  const [userName, setUserName] = useState("");
  const [loginButton, setLoginButton] = useState(null);
  const [logoutButton, setLogoutButton] = useState(null);

  // const clearCookies = () => document.cookie = "expires=Thu,01Jan1970 00:00:00UTC; path = /;";

  useEffect(() => {
    const loginTag = <a href={loginLink} className="nav-link">Login with Google</a>;

    const reset = () => {
      setUserName("");
      localStorage.clear();
      setLoginButton(loginTag);
      setLogoutButton(null);
      //   clearCookies();
      updateDisplayFromLocal();
    };

    const onLogout = () => {
      KittenDataService.logout()
        .then(() => reset());
    };

    const logoutTag = <button className="nav-link" type="button" onClick={() => onLogout()}>Logout</button>;

    const getLoginStatus = async () => {
      try {
        const result = await KittenDataService.isLoggedIn();
        console.log(result.data);
        const { loggedIn, user } = result.data;
        if (loggedIn) {
          const { name } = user;
          setUserName(name.givenName || name);
          const greeting = <span className="nav-link">{`Hi, ${userName}!`}</span>;
          setLoginButton(greeting);
          setLogoutButton(logoutTag);
          updateDisplayFromLocal();
        } else onLogout();
      } catch (err) { Alert.Problem(err); }
      // } catch (err) { console.error(err); }
    };

    getLoginStatus();
  }, [userName, updateDisplayFromLocal]);

  return (
    <span className="d-flex">
      {loginButton}
      {logoutButton}
    </span>
  );
};

export default LoginButton;
