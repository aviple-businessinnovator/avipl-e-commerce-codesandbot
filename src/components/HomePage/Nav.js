import React from 'react'
import './navbar.css'
import { Avatar } from '@material-ui/core'
import logo from './Group 161.png'
import { useHistory } from 'react-router'
import { NavLink } from 'react-router-dom'
import { axioss } from '../api/api'
const Nav = () => {
    let h = useHistory()
    const Logout = () => {
        axioss({ method: 'post', url: '/logout' }).then((res) => {
            localStorage.clear();
            h.push('/');
            window.location.reload();
        }).catch((Err) => {
            console.log(Err);
        })
    }
    return (
        <div>
            <nav className="na">
                <ul className="h" style={{ backgroundImage: `url('${logo}')`, backgroundRepeat: "no-repeat" }}></ul>
                <input className="nav-input" type="text" placeholder="What do you want to learn today?"></input>
                <ul className="pt"><a href="/home">Home</a></ul>
                <ul className="tt"><a href="#">My Classes</a></ul>
                <ul className="ts"><a href="/e-commerce">Shop</a></ul>
                <div className="nav-home-logout" onClick={() => Logout()}>Logout</div>
                {/* <NavLink to='/sign-in'>
                    <ul className="avatar">
                        <Avatar src="https://www.kindpng.com/picc/m/780-7804962_cartoon-avatar-png-image-transparent-avatar-user-image.png" /></ul>
                </NavLink > */}
            </nav>
        </div>
    )
}

export default Nav;
