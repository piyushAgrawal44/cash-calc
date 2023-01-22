import React, { useEffect, useState } from 'react'

function Profile(props) {

    if (!localStorage.getItem('cash-calc-1@#1-auth-token')) {
        window.location.href = "/login";
    }
    const backendURL = "https://cash-calc-backend.vercel.app";
    const [userDetails, setUserDetails] = useState({name:"",email:""})
    async function fetchUserDetails() {
        try {
            props.setProgress(10);
            const response = await fetch(backendURL + "/profile", {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                    'user-auth-token': localStorage.getItem('cash-calc-1@#1-auth-token')
                },
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
                // document.getElementById('addBtn').disabled=false;
                return;
            }
            setUserDetails(resultData.user);
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
            // document.getElementById('addBtn').disabled=false;
            return 0;
        }
    }

    useEffect(() => {
        fetchUserDetails();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card" >
                            <div className="card-body">
                                <h5 className='mb-3'>Your Profile: </h5>
                                <div className="d-flex gap-3 mb-2">
                                    <div className="title">Name</div>
                                    <span>:</span>
                                    <div className="value">{userDetails.name}</div>
                                </div>
                                <div className="d-flex gap-3 mb-2">
                                    <div className="title">Email</div>
                                    <span>:</span>
                                    <div className="value">{userDetails.email}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile