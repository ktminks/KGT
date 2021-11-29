import React from "react";
import useAuthStatus from "../../_services/auth.service";

const LoginButton = () => {
  const { loginButton, logoutButton } = useAuthStatus();

  return (
    <span className="d-flex">
      {loginButton}
      {logoutButton}
    </span>
  );
};

export default LoginButton;
