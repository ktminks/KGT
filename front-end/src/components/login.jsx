import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [googleButtonType, setGoogleButtonType] = useState("signin_with");
  const [googleButtonClass, setGoogleButtonClass] = useState("g_id_signin");
  //   const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  const register = () => {
    setGoogleButtonType("signup_with");
    setGoogleButtonClass("g_id_signup");
  };
  const showPassword = () => {
    // eslint-disable-next-line no-unused-expressions
    passwordType === "password"
      ? setPasswordType("text")
      : setPasswordType("password");
  };

  return (
    <div className="w-100 d-flex flex-column justify-content-center">
      <div className="w-100 d-flex flex-column flex-md-row">
        <div className="w-100 d-flex flex-column justify-content-evenly text-center w-50">
          <h4>Login to see your kitties</h4>

          <form>
            <div className="input-group">
              <span className="input-group-text">Email</span>
              <input
                type="email"
                className="form-control"
                value={email}
                placeholder="my email"
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength="20"
              />
            </div>

            <div className="input-group mt-2">
              <span className="input-group-text">Password</span>
              <input
                type={passwordType}
                className="form-control"
                value={password}
                placeholder="something strong"
                onChange={(e) => setPassword(e.target.value)}
                required
                maxLength="30"
              />
              <input
                type="button"
                aria-label="View password"
                className="input-group-text"
                value="👁"
                onClick={(e) => showPassword(e)}
              />
            </div>

            <div className="d-flex justify-content-evenly my-2">
              <input
                type="button"
                aria-label="Go back"
                value="Back"
                onClick={() => { history.goBack(); }}
                className="btn btn-secondary w-50"
              />
              <input
                type="submit"
                className="btn btn-primary ms-2 w-50"
                value="Login"
              />
            </div>
          </form>
        </div>

        <div className="w-100 d-flex flex-column justify-content-center text-center">
          <h4>or</h4>
          <div data-testid="google-signin-button" className="w-100 h-100 mb-2">
            <div
              id="g_id_onload"
              data-client_id="843196960554-8lss663jtiigovh3tkqse44eqohvvf5g.apps.googleusercontent.com"
              data-login_uri="http://localhost:4000/auth/googleLogin"
              data-auto_prompt="false"
            />
            <div
              className={googleButtonClass}
              data-type="standard"
              data-size="large"
              data-width="200"
              data-theme="outline"
              data-text={googleButtonType}
              data-shape="circle"
              data-logo_alignment="left"
            />

          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        <h6>No account yet?</h6>
        <input
          type="button"
          aria-label="Register"
          value="Register"
          onClick={(e) => register(e)}
          className="btn btn-warning ms-2 w-50"
        />
      </div>

    </div>
  );
};

export default LoginPage;
