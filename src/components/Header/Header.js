import React, { Component } from "react";
import { FaSun } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import "./header.scss";
import { Link } from "react-router-dom";

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      toggle: false
    };
    this.toggler = this.toggler.bind(this);
  }

  toggler() {
    this.setState(prevState => {
      return {
        toggle: !prevState.toggle
      };
    });
  }

  render() {
    return (
      <header>
        <div className="header-bar">
          <button className="header-button" onClick={this.toggler}>
            <TiThMenu />
          </button>
          <Link to="/">
            <FaSun />
          </Link>

          <nav className={this.state.toggle ? "show" : ""}>
            <ul>
              <div className={!this.state.toggle ? "list-of-serv" : ""}>
                <li>
                  <a href="#/services">ABOUT</a>
                </li>

                <li>
                  <Link to="/map">FIND</Link>
                </li>
                <li>
                  <a href="/services">SHOP</a>
                </li>
                <li>
                  <Link to="/register">REGISTER</Link>
                </li>
              </div>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}
