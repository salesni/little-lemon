import React from 'react';
import './FoodCard.css';


function FoodCard(props) {
  const [numberOfDishes, setNumberOfDishes] = React.useState(0);
  const increaseDecreaseInput = (input) =>{
    let newNumberOfDishes = numberOfDishes + input;
    newNumberOfDishes < 0 ? setNumberOfDishes(0):setNumberOfDishes(newNumberOfDishes);
  }

  return (
    <div className='foodCard'>
        <img  src={props.src} alt={props.dish.alt}></img>
        <div className='dishName'>
            <h4>{props.dish.dishName}</h4>
            <p className='dishPrice'>{props.dish.price}</p>
        </div>
        <p className='dishDescription'>{props.dish.description}</p>
        {
          props.href === undefined? 
            <>
              <div className='incrementContainer'>
                <button className='increment_decrement_button'
                onClick={()=>increaseDecreaseInput(-1)}>-</button>
                <input className='dishInput' type="number" value={numberOfDishes} />
                <button className='increment_decrement_button' 
                  onClick={()=>increaseDecreaseInput(1)}>+</button>
              </div>
                <button className='addCartBtn'>
                  Add to Cart
                  </button>
            </>
          :
            <a className='orderForDelivery' href={props.href}>
            Order a delivery {'  '}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-truck-flatbed" viewBox="0 0 16 16">
                  <path d="M11.5 4a.5.5 0 0 1 .5.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-4 0 1 1 0 0 1-1-1v-1h11V4.5a.5.5 0 0 1 .5-.5M3 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2m1.732 0h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4a2 2 0 0 1 1.732 1"/>
                </svg>
            </a>

        }
        
    </div>
  )
}

export default FoodCard;