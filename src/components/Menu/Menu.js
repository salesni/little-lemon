import React from 'react'
import Header from '../Header';
import Footer from '../Footer/Footer';
import FoodCard from '../commons/FoodCard/FoodCard';
import menuDishes from './menuDishes.json';
import './Menu.css';
import { useMenuContext } from '../../context/MenuProvider';
import Basket from '../../commons/icons/Basket.svg';

const foodCardList = menuDishes.menuDishes.map((dish)=>{
  return <FoodCard dish={dish} key={`Highlight_${dish.dishName}`}
          src={require(`../../commons/img/${dish.src}`)}/>
});

function Menu() {
  const {menuState} = useMenuContext();
  return (
    <>
        <Header/>
        <main>
          <article id='menu'>
            <div id='menuHeaderBox'>
              <div  id='menuHeaders'>
                <h1>
                    Menu
                </h1>
                <button className='cart'>
                  {
                    menuState.cartTotalItems>0 ? 
                    <span class="count">{ menuState.cartTotalItems}</span>
                    : <></>
                  }
                  <img src={Basket} alt='basket'></img>
                </button>
              </div>
              <hr/>
            </div>
                  
            <section id='menuCardsBox'>
                {foodCardList}
            </section>

          </article>
        </main>
        <Footer/>
    </>
  )
}

export default Menu;