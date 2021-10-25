import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// import KittenDataService from "../_services/data.service";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  //   const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

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
          <div data-testid="google-signin-button" className="w-100 h-100 mb-2 d-flex justify-content-center text-center">
            {/* <div
              id="g_id_onload"
              data-client_id=
              "843196960554-8lss663jtiigovh3tkqse44eqohvvf5g.apps.googleusercontent.com"
              data-context="signin"
              data-ux_mode="popup"
              data-login_uri="http://localhost:4000/auth/googleLogin"
              data-auto_prompt="false"
            />

            <div
              className="g_id_signin"
              data-type="standard"
              data-shape="pill"
              data-theme="filled_blue"
              data-text="signin_with"
              data-size="large"
              data-logo_alignment="left"
            /> */}
            {/* <input
              type="button"
              className="btn btn-danger"
              value="Login with Google"
              onClick={() => { KittenDataService.googleLogin(); }}
            /> */}
            <a href="http://localhost:4000/api/auth/google/login" className="btn btn-primary">Login with Google</a>
            <a href="http://localhost:4000/api/auth/google/logout" className="btn btn-danger">Logout with Google</a>
          </div>
        </div>
      </div>
      <div className="text-center">
        <h6>No account yet?</h6>
        <Link to="/register" className="btn btn-warning ms-2 w-50">Register</Link>
      </div>

    </div>
  );
};

export default LoginPage;
