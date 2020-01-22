import React, {Component} from 'react';
import './login.scss';
import axios from 'axios';
import { connect } from "react-redux";
import { setUser } from '../../Ducks/reducer';
import {withRouter} from 'react-router-dom';
import Header from '../Header/Header';



class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            redirect: false
        }

    }

    async login(){
        const { email, password } = this.state;
        const loggedInUser = await axios.post("/auth/login", {
            email,
            password
        })
        this.props.setUser(loggedInUser.data);
        if (loggedInUser)
            {this.props.history.push('/shop')}
        console.log(loggedInUser);
  
    }

    render(){
        const {email, password, redirect} = this.state;
        return(
          <div className={!this.props.user ? 'login-body': 'login'}>
         
                <div className='about'>By buying organic produce from your local farmer, you are working to maintain a healthy environment, a vibrant community, and a strong and sustainable local economy for you and your family to thrive in. 
                </div>
                {this.props.user ? null :
                <form className='login-form'>
                  <div className="login-header">
                    LOGIN
                    </div>
                    <div className="input-container">
            
            <input placeholder="email"
              type="email"
              value={email}
              onChange={e =>
                this.setState({
                  email: e.target.value
                })
              }
            />
          </div>
          {/* password */}
          <div className="input-container">
            
            <input placeholder="password"
              type="password"
              value={password}
              onChange={e =>
                this.setState({
                  password: e.target.value
                })
              }
            />
          </div>
          <button className="login-button"
          onClick={e => {
            e.preventDefault();
            this.login()
            
            
             
          }}
          >Submit</button>
                </form>
    }
            </div>
        )
    }
}
function mapReduxStateToProps(reduxState){
  return reduxState;
}

const mapDispatchToProps = {
  setUser
};

const enhancedComponent = connect(
  mapReduxStateToProps,
  mapDispatchToProps
);

export default enhancedComponent(withRouter(Login));
