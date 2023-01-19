import React from 'react'
import './css/Login.css'
function Login() {
    function handleSubmit(e){
        e.preventDefault();
        console.log("Hello");
    }
    return (
        <>
        <br />
            <div className="p-2">
            <div className="charts loginCard">
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
                    <button type="submit" className="addBtn mt-2">Login</button>
                </form>

            </div>
            </div>
        </>
    )
}

export default Login