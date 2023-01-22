import React from 'react'
import './css/Navbar.css';
import { Link } from 'react-router-dom';
function Navbar() {
    function handleLogout(){
        localStorage.removeItem("cash-calc-1@#1-auth-token");
        window.location.href="/login"
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                <div className="container-fluid">
                    {localStorage.getItem('cash-calc-1@#1-auth-token') && <Link className="navbar-brand" to="/"><i className="bi bi-calculator"></i> Cash Calc</Link>}
                    {!localStorage.getItem('cash-calc-1@#1-auth-token') && <span className="navbar-brand"><i className="bi bi-calculator"></i> Cash Calc</span>}
                    
                    <button className="navbar-toggler outline-none box-shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="bi bi-list"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {
                                localStorage.getItem('cash-calc-1@#1-auth-token') && <li className="nav-item">
                                    <Link className="nav-link" id="home_link" aria-current="page" to="/transactions"><i className="bi bi-piggy-bank"></i> Transactions</Link>
                                </li>
                            }
                            {
                                localStorage.getItem('cash-calc-1@#1-auth-token') && <li className="nav-item">
                                    <Link className="nav-link" id="home_link" aria-current="page" to="/profile"><i className="bi bi-person-badge"></i> Profile</Link>
                                </li>
                            }
                            {
                                !localStorage.getItem('cash-calc-1@#1-auth-token') && <li className="nav-item">
                                    <Link className="nav-link " id="login_link" to="/login"><i className="bi bi-box-arrow-in-right"></i> Login</Link>
                                </li>
                            }
                            {
                                !localStorage.getItem('cash-calc-1@#1-auth-token') && <li className="nav-item">
                                    <Link className="nav-link " id="register_link" to="/register"><i className="bi bi-r-circle"></i> Register</Link>
                                </li>
                            }
                            {
                                localStorage.getItem('cash-calc-1@#1-auth-token') && <li className="nav-item">
                                    <p className="nav-link cursor-pointer mb-0" id="logout_link" onClick={handleLogout}><i className="bi bi-door-open"></i> Logout</p>
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