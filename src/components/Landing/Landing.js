import React from "react";
import "./landing.scss";
import Login from "../Login/Login";
import { TiArrowDown } from "react-icons/ti";
import Middle from "./Middle";
import { Link } from 'react-scroll';
import image from './flagmarketplacewhite.png'

function Landing() {
  return (
    <div className="landing-body">
      <div className="landing">
          <img className="logo" src={image} alt="logo"/>
        {/* Flagstaff Marketplace */}
         <div className="farm-table">Order goods from local farms to your doorstep</div>
        <Link duration={700} smooth={true} to="middle">
          <TiArrowDown />
        </Link>
      </div>
      <Middle/>
      <div>
        <Login />
      </div>
    </div>
  );
}

export default Landing;
