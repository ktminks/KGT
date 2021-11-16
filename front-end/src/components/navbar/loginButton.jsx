import React, { useState } from "react";
import useHandleAuth from "../../hooks/handleAuth";
// import { Link } from "react-router-dom";

const LoginButton = ({ updateDisplayFromLocal }) => {
  const [loginButton, setLoginButton] = useState(null);
  const [logoutButton, setLogoutButton] = useState(null);
  // const clearCookies = () => document.cookie = "expires=Thu,01Jan1970 00:00:00UTC; path = /;";

  useHandleAuth({ setLoginButton, setLogoutButton, updateDisplayFromLocal });

  return (
    <span className="d-flex">
      {loginButton}
      {logoutButton}
    </span>
  );
};

export default LoginButton;
