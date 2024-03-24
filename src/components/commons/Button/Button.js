import React from 'react';
import './Button.css'
import { Link } from 'react-router-dom';


function Button(props) {
  const color = props.colorClass === undefined ? '' :props.colorClass;
  return (
    <>
      {
         props.href === undefined?
          <button className={`little-lemon-button ${color}`} href={props.href}
              onClick={props.func} >
            {
              props.title
            }
          </button>
          :
          <Link  to={props.href} style={{textDecoration:'none'}}>
            <button className={`little-lemon-button ${color}`}
             href={props.href} onClick={props.func} >
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