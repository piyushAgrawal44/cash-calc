import React from 'react'
// import '../css/Table.css';
import DataTable from 'react-data-table-component';
export default function Table(props) {

    const colums = [
        {
            name: <h6><b>Amount</b></h6>,
            selector: (row) => <div className='white-space-wrap'>{row.transactionAmount} <i class="bi bi-currency-rupee"></i></div>,
            sortable: true,

        },
        {
            name: <h6><b>Type</b></h6>,
            selector: (row) => <div className={`white-space-wrap  text-${row.transactionType==="Credit" ?"primary":"danger"}`} ><b>{row.transactionType}</b></div>,
            sortable: true,

        }, {
            name: <h6><b>Note</b></h6>,
            selector: (row) => <span className='white-space-wrap'>{row.transactionNote}</span>,
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
