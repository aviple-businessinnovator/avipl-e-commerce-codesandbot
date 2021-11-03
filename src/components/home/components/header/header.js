import React from 'react'
import "./header.css"
import logo from "../../asserts/logo.png"
import { NavLink } from 'react-router-dom';

export default function Header({ dropdown, setdropdown }) {
   return (
      <header>
         <div className="logo image" style={{ backgroundImage: `url('${logo}')` }}></div>
         <div className="image menu-logo" onClick={() => { console.log("he"); setdropdown(!dropdown) }}></div>
         <div className="header_right">
            <div className="header_options">
               <NavLink to={localStorage.getItem('Token') ? '/home' : '/sign-in'} className="header_link header_none"><h3>Home</h3></NavLink>
               <NavLink to="/" className="header_link"><h3>About</h3></NavLink>
               <a href="https://codesandbots.com/" className="header_link" ><h3>Learn In School</h3></a>
            </div>
            <div className="header-buttons">
               <NavLink to="/sign-in"><div className="login header-btn" >Log In</div></NavLink>
               {/* <NavLink to="/sign-up"><div className="header-btn">Sign Up</div></NavLink> */}
            </div>
         </div>
      </header >
   )
}
