import React from 'react';
import ratingsJSON from './ratings.json';
import RatingsCard from '../commons/RatingCard/RatingCard'

const ratingCardList = ratingsJSON.ratings.map((rating)=>{
  return (
    <RatingsCard rating = {rating} key={rating.name}
    src={require(`../../commons/img/${rating.usernamePhoto}`)}/>
  )
});

function Testimonials() {
  return (
    <article id='Testimonials'>
        <div id='testimonialHeader'>
            <h1>
                This Week Specials!
            </h1>
        </div>
        <div id='ratingCardsBox'>
            {ratingCardList}
        </div>

    </article>
  )
}

export default Testimonials;