import React from 'react'
import './css/Register.css'

function Register() {

    function handleSubmit(e){
        e.preventDefault();
        console.log("Hello");
    }
    return (
        <>
            <br />
           <div className="p-2">
           <div className="charts loginCard">
                <h5 className="lineChartHeading text-center mb-0"><b>Register and Get Started !</b></h5>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="name" className="form-label">Name <span className='text-danger'>*</span></label>
                        <input required type="text" className="form-control outline-none box-shadow-none" name='name' id="name" aria-describedby="name" placeholder='Your Name' />
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
                        <input required type="password" className="form-control outline-none box-shadow-none"  minLength="6" placeholder='It must be same as password' name='cpassword' id="cpassword" />
                    </div>
                    <button type="submit" className="registerBtn mt-2">Register</button>
                </form>

            </div>
           </div>
        </>
    )
}

export default Register