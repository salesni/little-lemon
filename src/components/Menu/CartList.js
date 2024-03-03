import React,{useState} from 'react';
import { useMenuContext } from '../../context/MenuProvider';
import CartItemView from './CartItemView';
import Button from '../commons/Button/Button';


function CartList() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isValidEmailState, setIsValidEmailState] = useState(true); 
  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(value);
    setIsValidEmailState(isValidEmail);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const { menuState, setMenuState } = useMenuContext();

  const fullFillOrder = () => {
    if(!menuState.orderFullFilled){
      if (isValidEmailState && email !== '' && name !== '') {
        setMenuState({ type: 'fullFillOrder' });
      } else {
        alert('To checkout, enter a valid Email Address and Name');
      }
    }else{
      setMenuState({ type: 'reset' });
    }
  }

  const myCartList = Array.from(menuState.cartItemMap.entries()).map((entry) => {
    const [id, cartItem] = entry;
    return(<CartItemView dish={cartItem.dish} key={`cartItem_${cartItem.dish.id}`}/>)
  })

  return (
    <section id='cartList'>
      {myCartList}
      <div>
        <hr/>
        <h1> 
          {`Subtotal(${menuState.cartTotalItems} Dish${menuState.cartTotalItems>1? 'es':''}): `}
          <b>{`$${menuState.cartTotalMoney.toFixed(2)}`}</b>
        </h1>
        <div className='input-row'>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            name='name'
            value={name}
            onChange={handleNameChange}
            placeholder='Enter your name'
            required
            disabled={menuState.orderFullFilled}
          />
          <label htmlFor='email'>Email Address:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={handleEmailChange}
            placeholder='Enter your email address'
            required
            disabled={menuState.orderFullFilled} 
          />
          {!isValidEmailState && <p style={{ color: 'red' }}>Please enter a valid email address.</p>}
        </div>
        <div className="checkoutButtonDiv">
          <Button title={menuState.orderFullFilled? 'Order Again':'Checkout'}
           func={fullFillOrder} />
        </div>
      </div>

    </section>
  )
}

export default CartList;