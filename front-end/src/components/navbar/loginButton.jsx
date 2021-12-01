import React from "react";

const LoginButton = ({ useAuthStatus }) => {
  const { loginButton, logoutButton } = useAuthStatus();

  return (
    <span className="d-flex">
      {loginButton}
      {logoutButton}
    </span>
  );
};

export default LoginButton;
