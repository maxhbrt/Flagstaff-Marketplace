import React, {Component} from 'react';
import './card.scss'
import {IoIosAddCircle} from 'react-icons/io';

export default class Card extends Component{
    constructor(props){
        super(props)
    }

render(){
    const { item_id, item_name, price, cat, farm_name, description, image, addFunc } = this.props;
    return(
        <div className="card-container" >
            <img src={image}/>
            <h2>{item_name}</h2>
            <h3>{farm_name}</h3>
            <h3>{description}</h3>
            <h2>{price}</h2>
            <IoIosAddCircle size={30}
            
            />

        </div>
    )
}


}
