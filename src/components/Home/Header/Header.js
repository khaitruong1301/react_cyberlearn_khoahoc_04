import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'
export default function Header() {


    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <NavLink className="navbar-brand" to="/">Cyberlearn</NavLink>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <NavLink activeClassName="activeNavItem" activeStyle={{ fontWeight: 'bold' }} className="nav-link" to="/home">Home </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="activeNavItem" activeStyle={{ fontWeight: 'bold' }} className="nav-link" to="/about">About</NavLink>
                    </li>
                    <li className="nav-item dropdown">
                        <NavLink activeClassName="activeNavItem" activeStyle={{ fontWeight: 'bold' }} className="nav-link" to="/contact">Contact</NavLink>
                    </li>
                    <li className="nav-item dropdown">
                        <NavLink activeClassName="activeNavItem" activeStyle={{ fontWeight: 'bold' }} className="nav-link" to="/login">Login</NavLink>
                    </li>
                    <li className="nav-item dropdown">
                        <NavLink activeClassName="activeNavItem" activeStyle={{ fontWeight: 'bold' }} className="nav-link" to="/profile">profile</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="activeNavItem" activeStyle={{ fontWeight: 'bold' }} className="nav-link" to="/demohocmodal">Demo HOC </NavLink>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Bài tập</a>
                        <div className="dropdown-menu" aria-labelledby="dropdownId">
                            <NavLink className="dropdown-item" to="/todolistrfc">To do list rfc</NavLink>
                            <NavLink className="dropdown-item" to="/todolistrcc">To do list rcc</NavLink>
                            <NavLink className="dropdown-item" to="/todolistredux">To do list redux</NavLink>
                            <NavLink className="dropdown-item" to="/todolistsaga">To do list saga</NavLink>
                            <NavLink className="dropdown-item" to="/dragdrop">DemoDragDrop</NavLink>
                            <NavLink className="dropdown-item" to="/demo">Demo</NavLink>
                            <NavLink className="dropdown-item" to="/demodragdropdnd">Drag Drop DnD</NavLink>
                            
                            
                        </div>
                    </li>

                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>

    )
}



