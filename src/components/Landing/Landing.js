import React from "react";
import "./landing.scss";
import Login from "../Login/Login";
import { TiArrowDown } from "react-icons/ti";
import Middle from "./Middle";
import { Link } from "react-scroll";

function Landing() {
  return (
    <div className="landing-body">
      <div className="landing">
        Flagstaff Marketplace
          <Link duration={700} smooth={true} to="middle">
        
            <TiArrowDown />
        
          </Link>
      </div>
      <Middle  />
      <div>
        <Login />
      </div>
    </div>
  );
}

export default Landing;
