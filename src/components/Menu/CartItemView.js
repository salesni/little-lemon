import React from 'react';
import { useMenuContext } from '../../context/MenuProvider';

import Dish from '../../Model/Dish';
import CartItem from '../../Model/CartItem';


function CartItemView(props) {
    const {menuState, setMenuState} = useMenuContext();
    const dish = new Dish(props.dish.src, props.dish.id, props.dish.dishName,
        props.dish.price, props.dish.description);

    const valueChange = (event) =>{
        let num = event.target.value;
        const action = 'setItem';
        let amount = parseInt(num.replace(/^0+/, ''));
        amount = isNaN(amount) ? 0:amount;
        setMenuState(
            {
                type:action,
                dishID: dish.id,
                amount:amount
              }
        );
        
    }
        

    const increaseDecreaseInput = (addition) =>{
        let action = '';
        addition > 0 ? action = 'addItem': action ='deleteItem';
        setMenuState(
            {
                type:action,
                cartItem: new CartItem(addition,dish)
              }
        );
    }

    return (
        <div className='cartItem'>
            <img src={dish.src} alt={dish.alt}></img>
            <div>
                <h3>{dish.name}</h3>
                <p>{dish.description}</p>
                <p>{dish.price}</p>
            </div>
            <div>
                <button className='increment_decrement_button'
                        onClick={()=>increaseDecreaseInput(-1)}>
                            -
                </button>
                <input className='cartDishInput' type="number" 
                value={menuState.cartItemMap.get(dish.id).amount} 
                onChange={valueChange}/>
                <button className='increment_decrement_button' 
                        onClick={()=>increaseDecreaseInput(1)}>
                            +
                </button>
            </div>
        </div>
    )
}

export default CartItemView;