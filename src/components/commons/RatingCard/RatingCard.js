import React from 'react';
import './RatingCard.css';
import lemon from '../../../commons/icons/lemon.svg';

//<img src={lemon} alt="Lemon Star Rating"></img>

function RatingCard(props) {
  const lemonList =  [...Array(props.rating.ratingNum).keys()].map((index)=>{
    return <img src={lemon} key={`lemon_${index}_${props.rating.name}`} alt="Lemon Star Rating"></img>
  });
  return (
    <div className='ratingCard'>
        <div className='ratingStars'>
          <h4>Rating: </h4>
          <div>
            {
              lemonList
            }
          </div>
        </div>
        <div className='userCardData'>
            <img  src={props.src} alt={props.rating.name}></img>
            <h4>{props.rating.name}</h4>
        </div>
        <p className='ratingDescription'>
          {props.rating.description}
        </p>

        
    </div>
  )
}

export default RatingCard;