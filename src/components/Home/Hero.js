import React from 'react';
import './Home.css';
import Button from '../commons/Button/Button';
import RestaurantFood from '../../commons/img/restauranfood.jpg';

function Hero() {
  return (
    <article id='hero'>
        <div>
            <h1>
                Little Lemon
            </h1>
            <h2>
                Chicago
            </h2>
            <h3>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </h3>
            <Button title = 'Reserve a Table' />
        </div>
        <img id='heroImage' alt='Restaurant Food' src={RestaurantFood}></img>


    </article>
  );
}

export default Hero;