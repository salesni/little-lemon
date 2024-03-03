import React from 'react';
import { useMenuContext } from '../../context/MenuProvider';

import Dish from '../../Model/Dish';
import CartItem from '../../Model/CartItem';
import { faTrash, faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function CartItemView(props) {
    const {menuState, setMenuState} = useMenuContext();
    const dish = new Dish(props.dish.src, props.dish.id, props.dish.name,
        props.dish.price, props.dish.description);

    const valueChange = (event) =>{
        console.log(props.dish)
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
                <p>{`$ ${dish.getPrice()}`}</p>
            </div>
            <div className="cartItemInputContainer">
                <input className='cartDishInput' type="number"
                    value={menuState.cartItemMap.get(dish.id).amount}
                    onChange={valueChange} />
                {
                    menuState.orderFullFilled?  <></>:
                    <div className="cartItemButtons">
                    <button className='increment_decrement_cart'
                        onClick={() => increaseDecreaseInput(1)}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button className='increment_decrement_cart'
                        onClick={() => increaseDecreaseInput(-1)}>
                        <FontAwesomeIcon 
                        icon={menuState.cartItemMap.get(dish.id).amount === 1?faTrash:faMinus } />
                    </button>
                </div>
                }
            </div>
        </div>
    )
}

export default CartItemView;