import React from 'react';
import Logo from '../../commons/Logo.svg';
import MenuItem from './MenuItem';

const menuObj ={
  Home: '#',
 About: '#', 
 Menu: '#', 
 Reservations:'#',
 Order_Online: '#',
 Login: '#'
};
const mapUl = Object.keys(menuObj).map((item)=>{
  return  <MenuItem item={item} href={menuObj[item]}/>
});

function Navbar() {
  return (
    <nav>
      <img src={Logo} alt='little-lemmon logo'></img>
      <div>
        <ul>
          {mapUl}
        </ul>
      </div>

    </nav>
  )
}

export default Navbar;