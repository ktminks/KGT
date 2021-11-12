// import React from "react";
import UseAlert from "./UseAlert";

export function Problem({ message }) {
  (UseAlert(message, { type: "error" }));
}

export function Warn(message) {
  (UseAlert(message, { type: "error", timeout: 2000 }));
}

export function BriefInfo(message) {
  (UseAlert(message, { type: "info", timeout: 2000 }));
}

export function Info(message) {
  (UseAlert(message, { type: "info" }));
}

export function Success(message) {
  (UseAlert(message, { type: "success", timeout: 2000 }));
}
