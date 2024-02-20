import React from 'react';
import {NavLink } from 'react-router-dom';

function MenuItem(props) {
  return (
        <li className='navbarItem'>
            <NavLink   to={props.href}>
                  {props.item.replace('_',' ')}
            </NavLink >
        </li>
  )
}

export default MenuItem;