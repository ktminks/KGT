import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import KittenDataService from "../_services/data.service";
import { loginLink } from "../_services/address.service";

export default function useHandleAuth(props) {
  const alert = useAlert();
  const [userName, setUserName] = useState("");
  const { setLoginButton, setLogoutButton, updateDisplayFromLocal } = props;

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
        .then(() => {
          reset();
          alert.success("Logout successful", { timeout: 2000 });
        });
    };

    const logoutTag = <button className="nav-link" type="button" onClick={() => onLogout()}>Logout</button>;

    const getLoginStatus = async () => {
      try {
        const result = await KittenDataService.isLoggedIn();
        // console.log(result.data);
        const { loggedIn, user } = result.data;
        if (loggedIn) {
          const { name } = user;
          setUserName(name.givenName || name);
          const greeting = <span className="nav-link">{`Hi, ${userName}!`}</span>;
          setLoginButton(greeting);
          setLogoutButton(logoutTag);
          updateDisplayFromLocal();
        } else onLogout();
      } catch (err) { alert.error(err, { timeout: 5000 }); }
      // } catch (err) { console.error(err); }
    };

    getLoginStatus();
  }, [alert, userName, setLoginButton, setLogoutButton, updateDisplayFromLocal]);
}
