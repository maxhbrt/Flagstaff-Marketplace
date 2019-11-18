import React, {Component} from 'react';
import './card.scss'
import {IoIosAddCircle} from 'react-icons/io';
import axios from 'axios';
import {connect} from 'react-redux';

class Card extends Component{
    constructor(props){
        super(props)
        this.state = {
            cartIds:[]

    }

    }





 
      



render(){
    console.log(this.props)
    const { item_id, item_name, price, cat, farm_name, description, image, addFunc } = this.props;
    return(
        <div key={item_id} className="card-container" >
            <img classname={"pic"} src={image}/>
            <h2>{item_name}</h2>
            <h3>{farm_name}</h3>
            <h3>{description}</h3>
            <h2>{price}</h2>
            {!this.props.user ? null:
            <IoIosAddCircle size={30} className="add"
            onClick={() => {this.props.ids.includes(item_id) ? 
                this.props.updateQuantity(item_id, price)
               
                :
                
                
                this.props.addToCart(this.props.user.user_id, item_id, price)
                
            }
            
            }
/>}
            

        </div>
    )
}


}


const mapStateToRedux = state => {return state}
export default connect(mapStateToRedux)(Card)

