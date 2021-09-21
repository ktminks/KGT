import React, { Component } from "react";
import "./public/bootstrap.min.css";
import "./public/App.css";

import Navbar from "./components/navbar";
import KittenDisplay from "./components/kittendisplay";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container mt-3">
          <KittenDisplay />
        </div>
      </div>
    );
  }
}

export default App;
