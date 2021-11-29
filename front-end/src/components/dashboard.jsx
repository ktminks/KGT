import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const linkStyles = "card w-50 text-reset text-decoration-none m-2 py-5";
  const titleStyles = "card-title display-2";

  return (
    <div
      className="w-100 d-flex justify-content-evenly text-center"
      data-testid="dashboard"
    >
      <Link to="/kittens" className={linkStyles} data-testid="kittendisplay-link">
        <h2 className={titleStyles}>My Kittens</h2>
      </Link>
      <Link to="/growth" className={linkStyles} data-testid="growthdisplay-link">
        <h2 className={titleStyles}>Growth Chart</h2>
      </Link>
    </div>
  );
};

export default Dashboard;
