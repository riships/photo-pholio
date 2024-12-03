import React from 'react'
import logo from '../Assets/Images/gallery-icon.jpg'
import style from '../styles/navbar.module.css'
import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <div className={style.navbar}>
            <NavLink to={'/'}>
                <img src={logo} alt='Logo' />
                <span className='text-white'>Photo Pholio</span>
            </NavLink>
        </div>
    )
}

export default Navbar