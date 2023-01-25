import React from 'react'
import './css/Register.css'
import { Link, useNavigate } from 'react-router-dom';

function Register(props) {
    let navigate = useNavigate();
    const backendURL = "https://cash-calc-backend.vercel.app";


    async function handleSubmit(e) {
        e.preventDefault();

        document.getElementById('registerBtn').disabled = true;
        let name = document.getElementById("name");
        let email = document.getElementById("email");
        let password = document.getElementById("password");
        let cpassword = document.getElementById("cpassword");
        if (cpassword.value !== password.value) {
            props.setAppAlert({
                bg: "danger",
                message: "Error ! Password and confirm password is not matching.",
                display: "block"
            });
            setTimeout(() => {
                props.setAppAlert({
                    bg: "warning",
                    message: "",
                    display: "none"
                });
            }, 2000);
            document.getElementById('registerBtn').disabled = false;
            return 0;
        }
        props.setProgress(100);

        let data = {};
        data["name"] = name.value;
        data["email"] = email.value;
        data["password"] = password.value;

        try {
            props.setProgress(10);
            const response = await fetch(backendURL + "/register", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            props.setProgress(50);

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
                document.getElementById('registerBtn').disabled = false;
                return;
            }

            localStorage.setItem("cash-calc-1@#1-auth-token", resultData.token);
            // window.location.href="/cash-calc";
            navigate("/");
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
            document.getElementById('registerBtn').disabled = false;
            return 0;
        }

    }

    function showPassword(e) {
        let passwordInput = document.getElementById('password');
        let cPasswordInput = document.getElementById('cpassword');
        if (e.target.checked) {
            passwordInput.type = "text";
            cPasswordInput.type = "text";

        } else {
            passwordInput.type = "password";
            cPasswordInput.type = "password";
        }
    }


    return (
        <>
            <div className="p-2">
                <div className="charts loginCard bg-black text-light py-5 px-3">
                    <h5 className="lineChartHeading text-center mb-0"><b>Register and Get Started !</b></h5>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <label htmlFor="name" className="form-label">Name <span className='text-danger'>*</span></label>
                            <input required type="text" className="form-control outline-none box-shadow-none" name='name' id="name" aria-describedby="name" placeholder='Your Name (minimum 3 character)' />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="email" className="form-label">Email <span className='text-danger'>*</span></label>
                            <input required type="email" className="form-control outline-none box-shadow-none" placeholder='Your Email' name='email' id="email" aria-describedby="email" />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password" className="form-label">Password <span className='text-danger'>*</span></label>
                            <input required type="password" className="form-control outline-none box-shadow-none" minLength="6" placeholder='Atleast 6 digits' name='password' id="password" />
                        </div>

                        <div className="mb-2">
                            <label htmlFor="password" className="form-label">Confirm Password <span className='text-danger'>*</span></label>
                            <input required type="password" className="form-control outline-none box-shadow-none" minLength="6" placeholder='It must be same as password' name='cpassword' id="cpassword" />
                        </div>

                        <div className="mb-2 form-check">
                            <input type="checkbox" onClick={showPassword} className="form-check-input box-shadow-none" id="showPassword" />
                            <label className="form-check-label" htmlFor="showPassword">Show Password</label>
                        </div>

                        <button type="submit" className="btn registerBtn mt-2" id='registerBtn' >Register</button>
                    </form>

                    <br />
                    <hr />
                    <div className="text-center">
                        <p>Already have an account then</p>
                        <Link className="btn btn-danger " id="register_link" to="/login">Login</Link>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Register