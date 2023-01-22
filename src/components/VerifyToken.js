import React from 'react';

function VerifyToken(props) {
    const backendURL = "https://cash-calc-backend.vercel.app";
    async function handleSubmit(e) {
        e.preventDefault();

        document.getElementById('resetBtn').disabled = true;
        let email = document.getElementById("email");
        let reset_token = document.getElementById("reset_token");
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
            document.getElementById('resetBtn').disabled=false;
            return 0;
        }

        let data = {};
        data["email"] = email.value;
        data["reset_token"] = reset_token.value;
        data["password"] = password.value;
        
        try {
            props.setProgress(10);
            const response = await fetch(backendURL + "/verifytoken", {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            props.setProgress(60);
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
                document.getElementById('resetBtn').disabled = false;
                return;
            }
            props.setAppAlert({
                bg: "success",
                message: "Successfully password updated !",
                display: "block"
            });
            setTimeout(() => {
                props.setAppAlert({
                    bg: "warning",
                    message: "",
                    display: "none"
                });
                window.location.href = "/login";
            }, 2000);
            

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
                <div className="charts bg-black text-light loginCard py-5 px-3">
                    <h5 className="lineChartHeading text-center mb-0"><b>Password reset</b></h5>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <label htmlFor="email" className="form-label">Email <span className='text-danger'>*</span></label>
                            <input required type="email" className="form-control outline-none box-shadow-none" placeholder='Your Email' name='email' id="email" aria-describedby="email" />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="reset_token" className="form-label">Token <span className='text-danger'>*</span></label>
                            <input required type="text" className="form-control outline-none box-shadow-none" placeholder='Your Token' name='reset_token' id="reset_token" aria-describedby="reset_token" />
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

                        <div className="d-flex gap-3 align-items-center mt-3">
                            <button type="submit" id='resetBtn' className="btn resetBtn">Reset Password</button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default VerifyToken