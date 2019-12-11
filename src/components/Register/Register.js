import React, {Component} from 'react';
import './register.scss';
import { connect } from "react-redux";
import { setUser } from '../../Ducks/reducer';
import {FaCheckCircle} from "react-icons/fa";
import axios from 'axios';
import {withRouter} from 'react-router-dom';


class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            name:"",
            address:"",
            redirect: false
            
        };
    }

    async register(){
      const { email, password, name, address } = this.state;
      const registeredUser = await axios.post("/auth/register", {
        email,
        name,
        password,
        address
      });
      this.props.setUser(registeredUser.data)
      if(registeredUser){
        this.props.history.push('/shop')
      }
    
  
    }



    render(){
        const { email, name, password, address } =  this.state; 
        return(
            <div>
                
            <div className='register-body'>
                Register
                <form className='register-form'

        >
          {/* username input */}
            
            <div className="input-container">
              
              <input placeholder="name"
                value={name}
                onChange={e =>
                  this.setState({
                    name: e.target.value
                  })
                }
              />
            </div>
          
          {/* email input */}
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
          {/* address */}
          <div className="input-container">
            
            <input placeholder="address"
              type="text"
              value={address}
              onChange={e =>
                this.setState({
                  address: e.target.value
                })
              }
            />
          </div>
          <button onClick={ e => {
            e.preventDefault();
            this.register();
          }}>

          REGISTER
          
          
          </button>
                </form>
           
            </div>
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

export default enhancedComponent(withRouter(Register));