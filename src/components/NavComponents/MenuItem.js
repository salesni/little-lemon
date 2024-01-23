import React from 'react';

function MenuItem(props) {
  return (
    <ul>
        <li>
            <a href={props.href}>
                  {props.item.replace('_',' ')}
            </a>
        </li>
  
    </ul>
  )
}

export default MenuItem;