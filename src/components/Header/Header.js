import React, { Component } from "react";
import { FaSun } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { connect } from "react-redux";
import { setUser, getQuantity } from "../../Ducks/reducer";
import "./header.scss";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { FaShoppingBasket } from "react-icons/fa";
import Badge from '@material-ui/core/Badge';


class Header extends Component {
  constructor() {
    super();
    this.state = {
      toggle: false,
      redirect:false,
      showLogout:false,
      quantity:0
    };
    this.toggler = this.toggler.bind(this);
   
  }

componentDidMount(){

  console.log("111111111111", this.props)
}

  toggler() {
    this.setState(prevState => {
      return {
        toggle: !prevState.toggle
      };
    });
  }


  render() {
    console.log(22222222222, (this.state.quantity))
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
                  <Link to="/map">FIND</Link>
                </li>
                <li>
                  <Link to="/shop">SHOP</Link>
                </li>
                <li>
                  <Link to="/register">REGISTER</Link>
                </li>
                
                {this.props.user ? 
                <li className="logout" onClick={() => {
                  axios.delete("/auth/logout").then(() =>{
                    this.props.setUser(null);
                    if(setUser(null))
                    {this.props.history.push('/logout')}
                    console.log(this.props)
                  })
                }} >
                  LOGOUT
                </li> : null}
                
          
                {this.props.user ? 
                 
             <li className = 'cart-link'
             onClick={() =>{this.props.history.push('/cart')}}> <Badge badgeContent={this.props.quantity} color="primary"><FaShoppingBasket/></Badge></li> :
                null
              }
     
              
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
  setUser,
  getQuantity
};

const invokedConnect = connect(
  mapReduxStateToProps,
  mapDispatchToProps
);

export default invokedConnect(withRouter(Header));
