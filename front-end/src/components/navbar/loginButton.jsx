import React, { useState, useEffect } from "react";
import KittenDataService from "../../_services/data.service";

const LoginButton = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getLoginStatus = () => {
      try {
        KittenDataService.isLoggedIn()
          .then((result) => {
            const { loggedIn, user } = result.data;
            setLoggedIn(loggedIn);
            if (loggedIn) {
              const { name } = user;
              setUserName(name.givenName || name);
            } else localStorage.clear();
            console.log(result.data);
            // return result.data;
          });
      } catch (err) { console.log(err); }
      // return { loggedIn: false, user: null };
    };

    getLoginStatus();
  }, []);

  const loginATag = <a href="http://localhost:4000/api/auth/google/login" className="nav-link">Login with Google</a>;
  const loggedInSpan = <span className="nav-link">{`Hi, ${userName}!`}</span>;
  const loginButton = isLoggedIn ? loggedInSpan : loginATag;
  const logoutButton = isLoggedIn ? <a href="http://localhost:4000/api/auth/logout" className="nav-link">Logout</a> : null;

  return (
    <span className="d-flex">
      {loginButton}
      {logoutButton}
    </span>
  );
};

export default LoginButton;
