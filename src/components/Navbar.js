import React from 'react'
import './css/Navbar.css';
import { Link } from 'react-router-dom';
function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><i className="bi bi-calculator"></i> Cash Calc</Link>
                    <button className="navbar-toggler outline-none box-shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="bi bi-list"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {
                                localStorage.getItem('cash-calc-1@#1-auth-token') && <li className="nav-item">
                                <Link className="nav-link" id="home_link" aria-current="page" to="/transactions">Transactions</Link>
                            </li>
                            }
                            <li className="nav-item">
                                <Link className="nav-link " id="login_link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " id="register_link" to="/register">Register</Link>
                            </li>
                            {
                                localStorage.getItem('cash-calc-1@#1-auth-token') && <li className="nav-item">
                                <button className="nav-link btn" id="logout_link" >Logout</button>
                            </li>
                            }
                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar