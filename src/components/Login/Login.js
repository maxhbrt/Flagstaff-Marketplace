import React, {Component} from 'react';
import './login.scss';
import axios from 'axios';
import { connect } from "react-redux";
import { setUser } from '../../Ducks/reducer';
import {withRouter} from 'react-router-dom';




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
        console.log(loggedInUser);
        if(loggedInUser){
          this.setState({redirect:true})
          console.log(this.state.redirect)
        }
    }

    render(){
        const {email, password, redirect} = this.state;
        return(
            <div className='login-body'>
                <div className='about'>Large scale chemical agriculture is poisoning our soils and our water, and weakening our communities. By buying direct from a family farm you can help put a stop to this unfortunate trend. By buying organic produce from your local farmer, you are working to maintain a healthy environment, a vibrant community, and a strong and sustainable local economy for you and your kids to thrive in. 
                </div>
                <form className='login-form'>
                    LOGIN
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
            this.login();
            if (setUser(!null))
            {this.props.history.push('/shop')}
            
             
          }}
          >LOGIN</button>
                </form>
           
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
