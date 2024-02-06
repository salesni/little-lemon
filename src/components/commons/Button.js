import React from 'react';
import './Button.css'


function Button(props) {
  return (
    <button className='little-lemon-button'>
        {props.title}
    </button>
  )
}

export default Button;