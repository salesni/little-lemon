import React from 'react';
import Logo from '../../commons/Logo.svg';
import MenuItem from './MenuItem';
import './Navbar.css';


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
      <img id='navBarLogo' src={Logo} alt='little-lemon logo'></img>
      <div>
        <ul id='buttonsList'>
          {mapUl}
        </ul>
      </div>

    </nav>
  )
}

export default Navbar;