import React from "react";
import "./landing.scss";
import Login from "../Login/Login";
import { TiArrowDown } from "react-icons/ti";
import Middle from "./Middle";

function Landing() {
  return (
    <div className="landing-body">
      <div className="landing">
        Flagstaff Marketplace
        <div className="arrow">
          <TiArrowDown />
        </div>
      </div>
      <Middle/>
      <div>
        <Login />
      </div>
    </div>
  );
}

export default Landing;
