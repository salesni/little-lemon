import React from 'react';
import FoodCard from '../commons/FoodCard/FoodCard';
import menuDishes from './menuDishes.json';

const foodCardList = menuDishes.menuDishes.map((dish)=>{
    return <FoodCard dish={dish} key={`Highlight_${dish.dishName}`}
            src={require(`../../commons/img/${dish.src}`)}/>
  });

function MenuCardBox() {
  return (
    <section id='menuCardsBox'>
        {foodCardList}
    </section>
  )
}

export default MenuCardBox;