import React from 'react'
import { Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom';

function ForgotPassword(props) {
    let history=useHistory();
    const backendURL = "https://cash-calc-backend.vercel.app";
    async function handleSubmit(e) {
        e.preventDefault();
        document.getElementById('resetBtn').disabled = true;
        let email = document.getElementById("email");
        let data = {};
        data["email"] = email.value;
        
        try {
            const response = await fetch(backendURL + "/resetpassword", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            const resultData = await response.json();
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
                document.getElementById('resetBtn').disabled = false;
                return;
            }
            props.setAppAlert({
                bg: "success",
                message: "Check you email for password reset token",
                display: "block"
            });
            setTimeout(() => {
                props.setAppAlert({
                    bg: "warning",
                    message: "",
                    display: "none"
                });
                // window.location.href = "/cash-calc/verifytoken";
                history.push("/verifytoken");
            }, 3000);
            

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
            document.getElementById('resetBtn').disabled = false;
            return 0;
        }

    }
    return (
        <>
            <div className="p-2">
                <div className="charts bg-black text-light loginCard py-5 px-3">
                    <h5 className="lineChartHeading text-center mb-0"><b>Enter email for password reset</b></h5>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <label htmlFor="email" className="form-label">Email <span className='text-danger'>*</span></label>
                            <input required type="email" className="form-control outline-none box-shadow-none" placeholder='Your Email' name='email' id="email" aria-describedby="email" />
                        </div>

                        <div className="d-flex gap-3 align-items-center mt-3">
                            <button type="submit" id='resetBtn' className="btn resetBtn">Reset Password</button>
                            <span>Or</span>
                            <Link to="/login" className='text-light'>Login</Link>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default ForgotPassword