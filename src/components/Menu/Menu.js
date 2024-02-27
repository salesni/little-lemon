import React, {useState} from 'react'
import Header from '../Header';
import Footer from '../Footer/Footer';
import MenuCardBox from './MenuCardBox';
import './Menu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark} from '@fortawesome/free-solid-svg-icons';
import { useMenuContext } from '../../context/MenuProvider';
import Basket from '../../commons/icons/Basket.svg';
import CartList from './CartList';


function Menu() {
  const [page, setPage] = useState('Menu');
  const togglePage = ()=>{
    page === 'Menu'? setPage('Cart'):setPage('Menu');
  }

  const {menuState} = useMenuContext();
  return (
    <>
        <Header/>
        <main>
          <article id='menu'>
            <div id='menuHeaderBox'>
              <div  id='menuHeaders'>
                <h1>
                    {page}
                </h1>
                <button className='cart' onClick={()=>togglePage()}>
                  {
                    (menuState.cartTotalItems>0 && page === 'Menu')  ? 
                    <span className="count">{ menuState.cartTotalItems}</span>
                    : <></>
                  }
                  {
                    page === 'Menu'? 
                    <img src={Basket} alt='basket'></img>:
                    <FontAwesomeIcon  className='closeCart'icon={faXmark} />
                  }
                </button>
              </div>
              <hr/>
            </div>
            {
              page === 'Menu'? 
              <MenuCardBox/> :
              <CartList/>
            }

          </article>
        </main>
        <Footer/>
    </>
  )
}

export default Menu;