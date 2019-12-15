import React, {Component} from 'react';
import CartHeader from '../Cart/CartHeader';
import './cart.scss';
import {FaShoppingCart} from "react-icons/fa"
import {getCart, addToCart} from '../../Ducks/reducer';
import { connect } from 'react-redux';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { toast } from "react-toastify";
import Header from '../Header/Header';
import Loader from "react-loader-spinner";
class Cart extends Component{
    constructor(props){
        super(props)
        this.state = {
            cart:[],
            checkoutTotal:0,
            isLoading: true
            
           
       
        
    }
    this.deleteAllCart = this.deleteAllCart.bind(this);
    this.sendOrder = this.sendOrder.bind(this);
this.getTotal = this.getTotal.bind(this);
     this.getCart = this.getCart.bind(this);
    this.deleteFromCart = this.deleteFromCart.bind(this);
    this.decQuantity = this.decQuantity.bind(this);
    }

    componentDidMount(){
        this.getCart();
        // this.deleteFromCart();
        // this.decQuantity();
     
        setTimeout(() => {
          this.setState({
            isLoading: false
          });
        }, 2000)

      //   setTimeout(() => {
      // this.getTotal()
      //   }, 2000)
     
    
        
    }



    
      deleteFromCart = async (  cart_id, price) => {
       
        const deletedCart = await axios.delete(`/api/deletefromcart/${cart_id}/`);
        this.setState({
          cart: deletedCart.data
        })
        let ids = this.state.cart.map(item => {
          return item.item_id;
        });
    
        this.setState({
          
          ids,
          checkoutTotal: this.state.cartTotal -= parseFloat(price)
        });
        this.setState({
          quantity: this.state.quantity -= 1
        });
        this.getTotal()
      };


      decQuantity(item_id, price) {
        const user_id = this.props.user.user_id;
        axios.put(`/api/decquantity/${item_id}`, { user_id }).then(response => {
          this.setState({ cart: response.data });
        })
        this.setState({
          cartTotal: this.state.cartTotal -= parseFloat(price)
        })
        this.setState({
          quantity: this.state.quantity -= 1
        })
        
      }
      getTotal(){
   
        const checkoutTotal = this.state.cart.map(item => parseFloat(item.price))
        
        .reduce((acc, curr) => {
          return acc += curr
        }, 0)
        
      console.log(checkoutTotal)
        this.setState({ checkoutTotal: checkoutTotal });


      }

    
    
    getCart(callback){

 axios.get(`/api/getcart`).then(response => {
        this.setState({ cart: response.data })
           
           
        this.getTotal()
          });  
          // callback()
    }
    async deleteAllCart() {
   
        await axios.delete(`/api/deleteallcart/`);
       
        this.setState({
          cart: []
        })
        let ids = this.state.cart.map(item => {
          return item.item_id;
        });
    
        this.setState({
          
          ids,
          checkoutTotal: 0
        });
        
      };


      async sendOrder() {
        const name = this.props.user.name
        const email = this.props.user.email
        const message = JSON.stringify(this.state.cart)
        const address = this.props.user.address
      console.log(message)
          await axios.post("/auth/contact",  {
             name,
            email,
            message,
            address
          })
        
      }


 

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
        this.sendOrder();
        this.deleteAllCart();
      }
      

    render(){

        const mappedcartItems = this.state.cart.map(item => {
          
            return( <div className='cart-item'>
                  <div>  <h2>{item.item_name}</h2></div>
                  <div className="price">
                  <h3 className="farm-name">{item.farm_name}</h3>
                   <h3>{item.quantity}</h3>
                   <h2>{(item.price * item.quantity).toFixed(2)}</h2>
                    <button className="delete" onClick={() => {item.quantity === 1 ?
                this.deleteFromCart( item.cart_id, item.price) :
                this.decQuantity(item.item_id, item.price)
                }} >X</button>
                </div>
                    </div>
                    
                    )
                    
                    
        })
        return(
         <div>
                <Header/>
               {this.state.checkoutTotal ? (  
              <div className='cart-body'>


              {this.state.isLoading ? (
            <Loader
              className="loader"
              type="BallTriangle"
              width={100}
              height={100}
              color="pink"
            />
          ) : (
             <div>
             <div className='cart-items'>
                 {mappedcartItems}
             </div>
          
           <div className='checkout'>
                 <div>TOTAL: {this.state.checkoutTotal.toFixed(2)}</div>
            <StripeCheckout 
            
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
            token={this.handleToken}
            billingAddress
            shippingAddress
            amount={this.state.checkoutTotal.toFixed(2) * 100}
            closed={this.sendAndDelete}
            />
      </div>
      </div>
           ) }
            </div>
               ) : (<div>Your cart is empty</div>)}
            </div>
        )
    }

}   
const mapStateToRedux = state => {return state}
export default connect(mapStateToRedux, addToCart)(Cart)
