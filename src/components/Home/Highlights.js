import React from 'react';
import './Home.css';
import Button from '../commons/Button/Button';
import FoodCard from '../commons/FoodCard/FoodCard';
import dishesJSON from './highlightDishes.json';







const foodCardList = dishesJSON.highlightDishes.map((dish)=>{
    return <FoodCard dish={dish} key={`Highlight_${dish.dishName}`}
            src={require(`../../commons/img/${dish.src}`)}
            href='/Menu'/>
});

function Highlights() {
  return (
    <article id='Highlights'>
        <div id='highlightHeaders'>
            <h1>
                This Week Specials!
            </h1>
            <Button title='Online Menu' href='/Menu'/>

        </div>
        <section id='highlightCardsBox'>
            {foodCardList}
        </section>

    </article>
  )
}

export default Highlights;