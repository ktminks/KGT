import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const linkStyles = "card w-50 text-reset text-decoration-none m-2 py-5";
  const titleStyles = "card-title display-2";

  return (
    <main
      className="w-100 d-flex justify-content-evenly text-center"
      aria-label="dashboard"
    >
      <Link to="/kittens" className={linkStyles} aria-label="kittendisplay-link">
        <h2 className={titleStyles}>My Kittens</h2>
      </Link>
      <Link to="/growth" className={linkStyles} aria-label="growthdisplay-link">
        <h2 className={titleStyles}>Growth Chart</h2>
      </Link>
    </main>
  );
};

export default Dashboard;
