import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import useUser from '../../Firebase/useUser'
import './Navbar.css'
import { signOut } from "firebase/auth";
import auth from '../../Firebase/firebase.init';

export const Navbar = () => {
    const navs = ["home", "about", "appointment", "reviews", "contact"]
    const user = useUser()
    function logoutUser() {
        signOut(auth).then(() => {
            window.location.reload()
        }).catch((error) => {
            // An error happened.
        });
    }
    return (
        <div className=''>
            <div className="navbar container mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex="0" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                navs.map(navbars => <li key={navbars}><Link className='nav-links' to={navbars}>{navbars}</Link></li>)
                            }

                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost normal-case text-3xl">Doctors Portal</Link>
                </div>

                <div className="navbar-end">
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal p-0">
                            {
                                navs.map(navbars => <li key={navbars}><NavLink className='nav-links mr-5' to={navbars}>{navbars}</NavLink></li>)
                            }

                        </ul>
                    </div>

                    {/* user Icon  */}
                    <div className="dropdown dropdown-end">
                        <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                            <div className="w-14 rounded-full">
                                {
                                    !user.uid ?
                                        <img alt='/' src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" />
                                        :
                                        <img src={user.photoURL ? user.photoURL : "https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"} alt="dfd" />
                                }
                            </div>
                        </label>
                        <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <Link to='#' className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li><Link to='#'>Settings</Link></li>
                            {
                                user.email ?
                                    <li><button onClick={logoutUser}>LogOut</button></li>
                                    :
                                    <li><Link to='/login'>Login</Link></li>
                            }
                        </ul>
                    </div>
                    {/* user Icon  */}

                </div>
            </div>
        </div>
    )
}
