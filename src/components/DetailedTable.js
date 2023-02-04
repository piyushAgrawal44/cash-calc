import React, { useState } from 'react'
import { useRef } from 'react';
// import '../css/Table.css';
import DataTable from 'react-data-table-component';
export default function Table(props) {
    const backendURL = "https://cash-calc-backend.vercel.app";

    const colums = [
        {
            name: <h6><b>Amount</b></h6>,
            selector: (row) => <div className='white-space-wrap'>{row.amount} <i className="bi bi-currency-rupee"></i></div>,
            sortable: true,

        },
        {
            name: <h6><b>Type</b></h6>,
            selector: (row) => <div className={`white-space-wrap  text-${row.type === "Credit" || row.type === "credit" ? "primary" : "danger"}`} ><b>{row.type}</b></div>,
            sortable: true,

        }, {
            name: <h6><b>Note</b></h6>,
            selector: (row) => <span className='white-space-wrap'>{row.note === "" ? "NA" : row.note}</span>,
            sortable: true,

        }, {
            name: <h6><b>Created At</b></h6>,
            selector: (row) => <span className='white-space-wrap'>{row.created_at === "" ? "NA" : row.created_at}</span>,
            sortable: true,

        },

    ]
    let ref1 = useRef(null);
    const [selectedRowsId, setSelectedRowsId] = useState([])
    const [displayBtn, setDisplayBtn] = useState("none")

    const handleSelect = (e) => {
        let selectedRows = e.selectedRows;
        if (selectedRows.length > 0) {
            if (displayBtn !== "flex") {
                setDisplayBtn("flex")
            }
        }
        else {
            setDisplayBtn("none");
        }
        setSelectedRowsId(selectedRows.map((e) => {
            return e._id;
        }))
        document.getElementById("select_count").innerText=selectedRows.length;
    }

    const handleDelete = async () => {
        
        if (selectedRowsId.length > 0) {
            ref1.current.click();
            let data = {
                "transaction_id": selectedRowsId
            };
            try {
                document.getElementById('addBtn').disabled = true;
                props.setProgress(10);
                const response = await fetch(backendURL + "/transaction/delete", {
                    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                    headers: {
                        'Content-Type': 'application/json',
                        'user-auth-token': localStorage.getItem('cash-calc-1@#1-auth-token')
                    },
                    body: JSON.stringify(data) // body data type must match "Content-Type" header
                });
                props.setProgress(60);
                const resultData = await response.json();
                props.setProgress(100);
                document.getElementById('addBtn').disabled = false;
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
                else{
                    setDisplayBtn("none");
                    props.fetchTransactionDetails();
                }
            }
            catch (error) {
                props.setProgress(100);
                console.log(error.message);
                props.setAppAlert({
                    bg: "danger",
                    message: "Please try agian later",
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
            }
        }
        else {
            ref1.current.click();
            props.setAppAlert({
                bg: "danger",
                message: "Please select atleast one row !",
                display: "block"
            });
            setTimeout(() => {
                props.setAppAlert({
                    bg: "warning",
                    message: "",
                    display: "none"
                });
            }, 2000);
        }

    }


    return (

        <>
            <DataTable
                columns={colums}
                data={props.data}
                pagination
                selectableRows
                selectableRowsHighlight
                onSelectedRowsChange={handleSelect}
            />

            <div className={`fixed-top mt-5 mx-2 rounded-3 d-${displayBtn} justify-content-center gap-3`} id='deleteBtnDiv'>
                <button className='btn btn-danger btn-sm rounded-5 box-shadow-none' id='deleteBtn' data-bs-toggle="modal" data-bs-target="#deleteModal">Delete Selected Row</button>
            </div>

            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" >Confirmation</h5>
                        </div>
                        <div className="modal-body">

                            <div className="px-2">
                                <p><b><span className='select_count' id='select_count'></span></b> row(s) seleted</p>
                                <p>Are you sure ? All your selected rows will be <b>deleted</b> forever !</p>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={ref1} className="closeBtn box-shadow-none" data-bs-dismiss="modal">No</button>
                            <button type="button" onClick={handleDelete} id="addBtn" className="btn addBtn box-shadow-none">Yes</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
