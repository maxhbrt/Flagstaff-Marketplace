import React, {Component} from 'react';
import './cartheader.scss';


export default class CartHeader extends Component {
    constructor(props){
        super(props)
            this.state ={
                items:[],
                total:0
            }
        }

        render(){
            return(
                <header className='cart-header'></header>
            )
        }
    }
