import React from 'react'

function Alert(props) {
    return (
        <>
            <div className={`alert alert-${props.bg} d-${props.display} p-2 mx-2 mb-2 fixed-bottom`} role="alert">
                {props.message}
            </div>
        </>
    )
}

export default Alert