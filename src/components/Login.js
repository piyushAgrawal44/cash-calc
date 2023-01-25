import React from 'react'
import './css/Login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login(props) {
    let navigate = useNavigate();
    const backendURL = "https://cash-calc-backend.vercel.app";
    async function handleSubmit(e) {
        e.preventDefault();

        document.getElementById('addBtn').disabled = true;
        let email = document.getElementById("email");
        let password = document.getElementById("password");
        let data = {};
        data["email"] = email.value;
        data["password"] = password.value;
        try {
            props.setProgress(10);
            const response = await fetch(backendURL + "/login", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            props.setProgress(40);
            const resultData = await response.json();
            props.setProgress(100);
            if (!resultData.success) {
                props.setAppAlert({
                    bg: "danger",
                    message: resultData.message,
                    display: "block"
                });
                setTimeout(() => {
                    props.setAppAlert({
                        bg: "warning",
                        message: "",
                        display: "none"
                    });
                }, 2000);
                document.getElementById('addBtn').disabled = false;
                return;
            }
            localStorage.setItem("cash-calc-1@#1-auth-token", resultData.token);
            navigate("/");
            // window.location.href="/cash-calc/";

        } catch (error) {
            props.setAppAlert({
                bg: "danger",
                message: "Internal server error !",
                display: "block"
            });
            setTimeout(() => {
                props.setAppAlert({
                    bg: "warning",
                    message: "",
                    display: "none"
                });
            }, 2000);
            document.getElementById('addBtn').disabled = false;
            return 0;
        }

    }

    function showPassword(e) {
        let passwordInput = document.getElementById('password');
        if (e.target.checked) {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    }
    return (
        <>
            <div className="p-2">
                <div className="charts bg-black text-light loginCard py-5 px-3">
                    <h5 className="lineChartHeading text-center mb-0"><b>Login into Your Account</b></h5>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <label htmlFor="email" className="form-label">Email <span className='text-danger'>*</span></label>
                            <input required type="email" className="form-control outline-none box-shadow-none" placeholder='Your Email' name='email' id="email" aria-describedby="email" />

                        </div>
                        <div className="mb-2">
                            <label htmlFor="password" className="form-label">Password <span className='text-danger'>*</span></label>
                            <input required type="password" className="form-control outline-none box-shadow-none" placeholder='Atleast 6 digits' name='password' id="password" />
                        </div>
                        <div className="mb-2 form-check">
                            <input type="checkbox" onClick={showPassword} className="form-check-input box-shadow-none" id="showPassword" />
                            <label className="form-check-label" htmlFor="showPassword">Show Password</label>
                        </div>
                        <div className="d-flex gap-3 align-items-center mt-3">
                            <button type="submit" id='addBtn' className="btn addBtn">Login</button>
                            <span>Or</span>
                            <Link to="/forgotpassword" className='text-light'>Forgot Password</Link>
                        </div>
                    </form>

                    <br />
                    <hr />
                    <div className="text-center">
                        <p>If you don't have an account then</p>
                        <Link className="btn btn-danger " id="register_link" to="/register">Register</Link>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Login