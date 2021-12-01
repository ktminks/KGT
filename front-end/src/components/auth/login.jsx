import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { loginLink } from "../../_services/address.service";
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
          <div aria-label="google-signin-button" className="w-100 h-100 mb-2 d-flex justify-content-center text-center">

            <a href={loginLink} className="btn btn-primary">Login with Google</a>
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
