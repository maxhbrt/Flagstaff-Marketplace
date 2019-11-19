import React, {Component} from 'react';
import CartHeader from '../Cart/CartHeader';
import './cart.scss';
import {FaShoppingCart} from "react-icons/fa"
import {getCart} from '../../Ducks/reducer';
import { connect } from 'react-redux';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { toast } from "react-toastify";

class Cart extends Component{
    constructor(props){
        super(props)
        this.state = {
            cart:[]
            
           
       
        
    }

     this.getCart = this.getCart.bind(this);
    
    }

    componentDidMount(){
        this.getCart();
       
        
    }
  

    
    
    getCart(id){
        axios.get(`/api/getcart/${id}`).then(response => {
            this.setState({ cart: response.data });
          });  
    }
    // async deleteAllCart() {
   
    //     await axios.delete(`/api/deleteallcart/`);
       
    //     this.setState({
    //       cart: []
    //     })
    //     let ids = this.state.cart.map(item => {
    //       return item.item_id;
    //     });
    
    //     this.setState({
          
    //       ids,
    //       cartTotal: 0
    //     });
        
    //   };
 

    async handleToken(token, addresses) {
        const response = await axios.post(
          "/api/checkout",
          { token, }
        );
        const { status } = response.data;
        console.log("Response:", response.data);
        if (status === "success") {
           toast("Success! Check email for details", { type: "success" });
          
        } else {
          toast("Something went wrong", { type: "error" });
          
        }
      }
      sendAndDelete = () => {
        this.props.sendOrder();
        this.props.deleteAllCart();
      }
      

    render(){

        const mappedcartItems = this.props.cartItems.map(item => {
            return( <div className='cart-item'>
                    <div>{item.item_name}</div>
                    <div>{item.farm_name}</div>
                    <div>{item.quantity}</div>
                    <div >{(item.price * item.quantity).toFixed(2)}</div>
                    <button className="delete" onClick={() => {item.quantity === 1 ?
                this.props.deleteFromCart( item.cart_id, item.price) :
                this.props.decQuantity(item.item_id, item.price)
                }} >X</button>
                    </div>
                    
                    )
                    
                    
        })
        return(
            <div className='cart-body'>
             <div className="header">
                 <FaShoppingCart/>
                 <div>TOTAL: {this.props.total.toFixed(2)}</div>
                 
             </div>
             <div>
                 {mappedcartItems}
             </div>
  
           
            <StripeCheckout 
            
            stripeKey={''}
            token={this.handleToken}
            billingAddress
            shippingAddress
            amount={this.props.total.toFixed(2) * 100}
            closed={this.sendAndDelete}
            />
      
            </div>
        )
    }

}   
const mapStateToRedux = state => {return state}
export default connect(mapStateToRedux)(Cart)
