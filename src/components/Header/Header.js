import React, { Component } from "react";
import { FaSun } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { connect } from "react-redux";
import { setUser } from "../../Ducks/reducer";
import "./header.scss";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";


class Header extends Component {
  constructor() {
    super();
    this.state = {
      toggle: false,
      redirect:false,
      showLogout:false
    };
    this.toggler = this.toggler.bind(this);
    this.showLogout = this.showLogout.bind(this);
  }



  toggler() {
    this.setState(prevState => {
      return {
        toggle: !prevState.toggle
      };
    });
  }
  showLogout(){
    if(this.props.user){
     return this.setState({showLogout:true})
    }
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
                  <Link to="/shop">SHOP</Link>
                </li>
                <li>
                  <Link to="/register">REGISTER</Link>
                </li>
                <div>
                {this.state.showLogout ? 
                <li onClick={() => {
                  axios.delete("/auth/logout").then(() =>{
                    this.props.setUser(null);
                    if(setUser(null))
                    {this.props.history.push('/logout')}
                    console.log(this.props)
                  })
                }} >
                  Logout
                </li> : null}
                </div>
              </div>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

function mapReduxStateToProps(reduxState) {
  return reduxState;
}
const mapDispatchToProps = {
  setUser
};

const invokedConnect = connect(
  mapReduxStateToProps,
  mapDispatchToProps
);

export default invokedConnect(withRouter(Header));
