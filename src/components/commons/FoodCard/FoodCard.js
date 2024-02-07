import React from 'react';
import delivery from '../../../commons/icons/truck-flatbed.svg';
import './FoodCard.css';

function FoodCard(props) {
  return (
    <div className='foodCard'>
        <img  src={props.src} alt={props.dish.alt}></img>
        <div className='dishName'>
            <h4>{props.dish.dishName}</h4>
            <p className='dishPrice'>{props.dish.price}</p>
        </div>
        <p className='dishDescription'>{props.dish.description}</p>
        <p className='orderForDelivery'>
            Order a delivery <i src={delivery}></i>
        </p>
        
    </div>
  )
}

export default FoodCard;