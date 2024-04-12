// Navbar.js
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { MdTrolley } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import { useAuth } from '../store/auth';
import './Navbar.css';

const Navbar = () => {
    const { isLoggedIn, user, products } = useAuth();
    const [showMenu, setShowMenu] = useState(false);

    const userCartCount = products.filter(product => product.cust_id === user._id && !product.booked).length;

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const closeMenu = () => {
        setShowMenu(false);
    };

    return (
        <>
            <header>
                <div className="container">
                    <div className="logo-brand">
                        <NavLink className='l' to="/" onClick={closeMenu}> E-Commerce </NavLink>
                    </div>

                    <div className="menu-toggle" onClick={toggleMenu}>
                        {showMenu ? <FaTimes /> : <FaBars />}
                    </div>

                    <nav className={`navbar ${showMenu ? "show" : ""}`}>
                        <ul>

                            {user.isAdmin ? (
                                <>
                                    <li>
                                        <NavLink className='navlink' to="/admin" onClick={closeMenu}>Home</NavLink>
                                    </li>
                                </>
                            ) : isLoggedIn ? (
                                <li>
                                    <NavLink className='navlink' to="/userhome" onClick={closeMenu}>Home</NavLink>
                                </li>
                            ) : (
                                <li>
                                    <NavLink className='navlink' to="/" onClick={closeMenu}>Home</NavLink>
                                </li>
                            )}


                            <li>
                                <NavLink className='navlink' to="/about" onClick={closeMenu}>About</NavLink>
                            </li>

                            <li>
                                <NavLink className='navlink' to="/service" onClick={closeMenu}>Products</NavLink>
                            </li>

                            <li>
                                <NavLink className='navlink' to="/contact" onClick={closeMenu}>Contact</NavLink>
                            </li>

                            {isLoggedIn ? (
                                <>
                                    <li>
                                        <NavLink className='navlink' to="/logout" onClick={closeMenu}>Logout</NavLink>
                                    </li>

                                    {!user.isAdmin && (  // Render only if user is not an admin
                                        <li>
                                            <NavLink style={{ fontSize: "3rem", color: "red" }} className='navlink' to="/user/usercart" onClick={closeMenu}>
                                                <MdTrolley /> ({userCartCount})
                                            </NavLink>
                                        </li>
                                    )}


                                </>

                            ) : (
                                <>
                                    <li>
                                        <NavLink className='navlink' to="/register" onClick={closeMenu}>Register</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className='navlink' to="/login" onClick={closeMenu}>Login</NavLink>
                                    </li>
                                </>
                            )}

                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Navbar;
