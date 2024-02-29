import React from 'react';
import { useMenuContext } from '../../context/MenuProvider';
import CartItemView from './CartItemView';

function CartList() {
  const {menuState} = useMenuContext();

  const myCartList = Array.from(menuState.cartItemMap.entries()).map((entry) => {
    const [id, cartItem] = entry;
    return(<CartItemView dish={cartItem.dish} key={`cartItem_${cartItem.dish.id}`}/>)
  })

  return (
    <section id='cartList'>
      {myCartList}
    </section>
  )
}

export default CartList