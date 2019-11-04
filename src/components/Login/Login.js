import React, {Component} from 'react';
import './login.scss';


export default class Login extends Component {
    constructor(props){
        super(props);

    }

    render(){
        return(
            <div className='login-body'>
                <div className='about'>Large scale chemical agriculture is poisoning our soils and our water, and weakening our communities. By buying direct from a family farm you can help put a stop to this unfortunate trend. By buying organic produce from your local farmer, you are working to maintain a healthy environment, a vibrant community, and a strong and sustainable local economy for you and your kids to thrive in. 
                </div>
                <form className='login-form'>
                    LOGIN
                </form>
           
            </div>
        )
    }
}