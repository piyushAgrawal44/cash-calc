import React from 'react';
import Table from './Table';
import TransactionChart from './TransactionChart';
import './css/Transaction.css'

function Transaction() {
    const transactionAmounts = [200, 300, 120];
    const labels = ['Monday', "Tuesday", "wednessday"];

    const data = [
        { transactionAmount: 100, transactionType: "Credit", transactionNote: "Payment recevied from aman" },
        { transactionAmount: 200, transactionType: "Credit", transactionNote: "Payment recevied from aman" },
        { transactionAmount: 300, transactionType: "Credit", transactionNote: "Payment recevied from aman" },
        { transactionAmount: 400, transactionType: "Debit", transactionNote: "Payment given to sahu" },
    ];
    return (
        <>

            <div className="container-fluid mt-5">
                <div className="row mb-5">
                    <h5 className="text-center filterHeading">Filter</h5>
                    <div className="col-12 col-sm-5 mb-2 align-self-center">
                        <label htmlFor="start_date" className=" m-0 p-0">Start Date</label>
                        <input type="date" className='form-control' name='start_date' id='start_date' />
                    </div>
                    <div className="col-12 col-sm-2 text-center  align-self-center">
                        <i className=" d-none d-sm-block bi bi-arrow-left-right"></i>
                    </div>
                    <div className="col-12 col-sm-5 mb-2 align-self-center">

                        <label htmlFor="end_date" className=" m-0 p-0">End Date</label>
                        <input type="date" className='form-control' name='end_date' id='end_date' />

                    </div>
                </div>
                <div className="transactionChart row">
                    <div className="col-12 mb-4">
                        <div className="charts">
                            <h5 className="lineChartHeading"><b>Transactions:</b></h5>
                            <br />
                            <TransactionChart Data={transactionAmounts} Lables={labels} />
                        </div>
                    </div>

                    <div className="col-12 mb-4">
                        <div className="charts">
                            <h5 className="lineChartHeading"><b>Transactions:</b></h5>
                            <br />
                            <Table data={data} />
                        </div>
                    </div>
                </div>
                <br />
            </div>
        </>
    )
}

export default Transaction