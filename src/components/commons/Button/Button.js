import React from 'react';
import './Button.css'
import { Link } from 'react-router-dom';


function Button(props) {
  return (
    <>
      {
         props.href === undefined?
          <button className='little-lemon-button' href={props.href} >
            {
              props.title
            }
          </button>
          :
          <Link  to={props.href} style={{textDecoration:'none'}}>
            <button className='little-lemon-button' href={props.href} >
              {
                props.title
              }
            </button>
          </Link>
      }
    </>

  )
}

export default Button;