import React, {Component} from 'react';
import './register.scss';
import Header from '../Header/Header';
import {FaCheckCircle} from "react-icons/fa";
import axios from 'axios';

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            name:"",
            address:""
            
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
      // this.props.setUser(registeredUser.data)
    }



    render(){
        const { email, name, password, address} =  this.state; 
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

          <FaCheckCircle size={40} 
          
          />
          </button>
                </form>
           
            </div>
            </div>
        )
    }
}