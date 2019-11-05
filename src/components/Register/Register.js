import React, {Component} from 'react';
import './register.scss';
import Header from '../Header/Header';
import {FaCheckCircle} from "react-icons/fa";

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

    render(){
        const { email, name, password, address} =  this.state; 
        return(
            <div>
                
            <div className='register-body'>
                Register
                <form className='register-form'
                onSubmit={e => {
            //   prevent default to stop form from refreshing
            e.preventDefault();
            
          }}
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
                  password: e.target.value
                })
              }
            />
          </div>
          <FaCheckCircle size={40}/>
                </form>
           
            </div>
            </div>
        )
    }
}