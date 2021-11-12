// import React from "react";
import { useAlert } from "react-alert";

export default function UseAlert(text, purpose) {
  const alert = useAlert();

  const callAlert = (message, { type, timeout = 5000 }) => {
    const options = { timeout, type };
    // alert[type](message, options);
    alert.show(message, { ...options });
  };
  switch (purpose) {
    case "success":
      callAlert(text, { type: "success", timeout: 2000 });
      break;
    case "error":
      callAlert(text, { type: "error" });
      break;
    case "warning":
      callAlert(text, { type: "warning", timeout: 2000 });
      break;
    case "info":
      callAlert(text, { type: "info" });
      break;
    case "briefInfo":
      callAlert(text, { type: "info", timeout: 2000 });
      break;
    default:
      callAlert(text, { type: "info" });
      break;
  }
}
