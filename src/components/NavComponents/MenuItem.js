import React from 'react';

function MenuItem(props) {
  return (
        <li className='navbarItem'>
            <a href={props.href}>
                  {props.item.replace('_',' ')}
            </a>
        </li>
  )
}

export default MenuItem;