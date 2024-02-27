import React, {useReducer} from 'react';
import CartItem from '../Model/CartItem';


const MenuContext = React.createContext('');

const addItem2Cart = (state,cartItem) =>{
    if(!state.cartItemMap.has(cartItem.dish.id)){
        state.cartItemMap.set(cartItem.dish.id, new CartItem(cartItem.amount, cartItem.dish))
    }else{
        state.cartItemMap.get(cartItem.dish.id).amount += cartItem.amount;
    }
    state.cartTotalItems += cartItem.amount;
    state.cartTotalMoney += cartItem.amount * cartItem.dish.price;
}

const deleteItem2Cart = (state,cartItem) =>{
    const dishID = cartItem.dish.id;
    const newAmount = cartItem.amount;
    if(state.cartItemMap.has(cartItem.dish.id)){
        state.cartTotalItems +=  newAmount;
        state.cartTotalMoney +=  newAmount * cartItem.dish.price;
        if((state.cartItemMap.get(dishID).amount + newAmount) <= 0){
            state.cartItemMap.delete(dishID);
        }else{
            state.cartItemMap.get(dishID).amount += newAmount;
        }
    }
}

const cart = (state,action) => {

    let tempState = {
        cartTotalItems:state.cartTotalItems,
        cartTotalMoney: state.cartTotalMoney,
        cartItemMap: state.cartItemMap
    }

    let operation = action.type;

    switch(operation) {
        case 'addItem':
            addItem2Cart(tempState,action.cartItem);
            break;
        
        case 'deleteItem':
            deleteItem2Cart(tempState,action.cartItem);
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
        cartItemMap: new Map()
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