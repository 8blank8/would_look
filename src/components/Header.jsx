import { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
   return (
      <header className='header'>
         <div className="header__title">would look</div>
         <div className="header__buttons">
            <NavLink
               to="/"
               style={({ isActive }) => ({ border: isActive ? "2px solid #5F5F5F" : "1px solid #202020" })}>
               <button
                  className='header__button header__button'>
                  добавить новое
               </button>
            </NavLink>
            <NavLink
               to="/catalog/view"
               style={({ isActive }) => ({ border: isActive ? "2px solid #5F5F5F" : "1px solid #202020" })}>
               <button
                  className='header__button header__button'>
                  посмотреть список
               </button>
            </NavLink>
         </div>
      </header>
   )
}

export default Header;