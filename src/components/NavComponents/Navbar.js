import React from 'react';
import { useState } from 'react';
import Logo from '../../commons/Logo.svg';
import MenuItem from './MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark} from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';


const menuObj ={
  Home: '#',
 About: '#', 
 Menu: '#', 
 Reservations:'#',
 //Order_Online: '#',
 //Login: '#'
};
const mapUl = Object.keys(menuObj).map((item)=>{
  return  <MenuItem item={item} key={`NavBar_${item}`} href={menuObj[item]}/>
});

function Navbar() {
  const [hamburgerState, setHamburgerState] = useState(true)
  const iconClick = ()=>{
    setHamburgerState(!hamburgerState)
  }
  return (
    <nav>
      <img id='navBarLogo' src={Logo} alt='little-lemon logo'></img>
      <div className='menuIcon' onClick={iconClick}>
        <FontAwesomeIcon icon={hamburgerState? faBars:faXmark} />
      </div>
      <div>
        <ul className={hamburgerState? 'navButtonsList':'navButtonsList active'}>
          {mapUl}
        </ul>
      </div>

    </nav>
  )
}

export default Navbar;