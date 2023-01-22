import React from 'react'
// import '../css/Table.css';
import DataTable from 'react-data-table-component';
export default function Table(props) {

    const colums = [
        {
            name: <h6><b>Amount</b></h6>,
            selector: (row) => <div className='white-space-wrap'>{row.amount} <i className="bi bi-currency-rupee"></i></div>,
            sortable: true,

        },
        {
            name: <h6><b>Type</b></h6>,
            selector: (row) => <div className={`white-space-wrap  text-${row.type==="Credit" || row.type==="credit" ?"primary":"danger"}`} ><b>{row.type}</b></div>,
            sortable: true,

        }, {
            name: <h6><b>Note</b></h6>,
            selector: (row) => <span className='white-space-wrap'>{row.note===""?"NA":row.note}</span>,
            sortable: true,

        }, {
            name: <h6><b>Created At</b></h6>,
            selector: (row) => <span className='white-space-wrap'>{row.created_at===""?"NA":row.created_at}</span>,
            sortable: true,

        },

    ]

    return (

        <>
            <DataTable
                    columns={colums}
                    data={props.data}
                    pagination
                />

        </>
    )
}
