import React, {useReducer} from 'react';
import CartItem from '../Model/CartItem';

const ADD_ITEM = 'addItem';
const DELETE_ITEM = 'deleteItem';
const SET_ITEM = 'setItem';
const FULFILL_ORDER = 'fullFillOrder';
const TOGGLE_PAGE ='togglePage'
const RESET = 'reset';

const MenuContext = React.createContext('');

const setItem2Cart = (state,dishID,amount)=>{
    if(state.cartItemMap.has(dishID)){
        const existingCartItem = state.cartItemMap.get(dishID);
        const amountDelta = amount - existingCartItem.amount;

        if (amountDelta > 0) {
            addItemToCart(state, 
                { id: dishID, amount: amountDelta, dish: existingCartItem.dish });
        } else {
            deleteItemFromCart(state, 
                { id: dishID, amount: amountDelta, dish: existingCartItem.dish });
        }
        
    }

}

const addItemToCart = (state,cartItem) =>{
    const { amount, dish } = cartItem;
    const id = dish.id;
    const existingCartItem = state.cartItemMap.get(id);

    if (!existingCartItem) {
        state.cartItemMap.set(id, new CartItem(amount, dish));
    } else {
        existingCartItem.amount += amount;
    }
    
    state.cartTotalItems += amount;
    state.cartTotalMoney += amount * dish.price;
}

const deleteItemFromCart  = (state,cartItem) =>{
    const { amount, dish } = cartItem;
    const id = dish.id;
    
    if (state.cartItemMap.has(id)) {
        const existingCartItem = state.cartItemMap.get(id);
        const newAmount = existingCartItem.amount + amount;
        
        state.cartTotalItems += amount;
        state.cartTotalMoney += amount * dish.price;
        
        if (newAmount <= 0) {
            state.cartItemMap.delete(id);
        } else {
            existingCartItem.amount = newAmount;
        }

        if (state.cartTotalItems === 0){
            state.page = 'Menu';
        }
    }
}

const cart = (state,action) => {

    let tempState = {
        cartTotalItems:state.cartTotalItems,
        cartTotalMoney: state.cartTotalMoney,
        cartItemMap: state.cartItemMap,
        orderFullFilled:state.orderFullFilled,
        page:state.page
    }

    let operation = action.type;

    switch(operation) {
        case ADD_ITEM:
            addItemToCart(tempState,action.cartItem);
            break;
        
        case DELETE_ITEM:
            deleteItemFromCart(tempState,action.cartItem);
            break;
        
        case SET_ITEM:
            setItem2Cart(tempState,action.dishID, action.amount);
            break;

        case FULFILL_ORDER:
            tempState.orderFullFilled = true;
            break;
        
        case TOGGLE_PAGE:
            tempState.page = tempState.page === 'Menu'? 'Cart':'Menu';
            break;

        case RESET:
            tempState = {
                cartTotalItems:0,
                cartTotalMoney:0.00,
                cartItemMap: new Map(),
                orderFullFilled:false,
                page:'Menu'
            };
            break;
    
        default:
            return tempState;
    }

    return tempState;

}



const MenuProvider = ({children}) => {

    const initialState = {
        cartTotalItems:0,
        cartTotalMoney:0.00,
        cartItemMap: new Map(),
        orderFullFilled:false,
        page:'Menu'
    };
    //dish structure
    /*
        map Key id, value object -> amount: , dish

    */

    const [menuState, setMenuState] = useReducer(cart, initialState);
    const providerState = {
        menuState, setMenuState
    }

    return(
        <MenuContext.Provider value={providerState} >
            {children}
        </MenuContext.Provider>
    )
}


export const useMenuContext = () => React.useContext(MenuContext);

export default MenuProvider;