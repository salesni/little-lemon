import React from 'react'
import Header from '../Header';
import Footer from '../Footer/Footer';
import FoodCard from '../commons/FoodCard/FoodCard';
import menuDishes from './menuDishes.json';
import './Menu.css'

const foodCardList = menuDishes.menuDishes.map((dish)=>{
  return <FoodCard dish={dish} key={`Highlight_${dish.dishName}`}
          src={require(`../../commons/img/${dish.src}`)}/>
});

function Menu() {
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