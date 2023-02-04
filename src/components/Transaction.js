import React, { useEffect, useState } from 'react';
import DetailedTable from './DetailedTable';
import './css/Transaction.css'

function Transaction(props) {

    const backendURL = "https://cash-calc-backend.vercel.app";


    const [todayTotalCreditAmt, setTodayTotalCreditAmt] = useState(0);
    const [todayTotalDebitAmt, setTodayTotalDebitAmt] = useState(0);
    const [transactions, setTransactions] = useState([]);

    async function fetchTransactionDetails() {
        try {
            props.setProgress(10);
            document.getElementById("start_date").value = "";
            document.getElementById("end_date").value = "";
            const response = await fetch(backendURL + "/transaction/filtertransaction", {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                    'user-auth-token': localStorage.getItem('cash-calc-1@#1-auth-token')
                },

            });
            props.setProgress(70);
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
                document.getElementById('filterBtn').disabled = false;
                return;
            }
            setTransactions(resultData.data);
        } catch (error) {
            props.setProgress(100);
            console.log(error.message);
            props.setAppAlert({
                bg: "danger",
                message: "Unable to fetch details ! Please try again later.",
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

    function convertDateFormate(dateStr) {
        let newDateFormate = "";
        console.log(dateStr)
        for (let i = 0; i < dateStr.length; i++) {
            const element = dateStr[i];
            if (element !== "-") {
                return dateStr;
            }
            else if (element !== "-") {
                newDateFormate += "-";
            }
            else {
                newDateFormate += element;
            }

        }
        return newDateFormate === "" ? dateStr : newDateFormate;
    }

    async function filterTransaction(start_date = null, end_date = null) {

        start_date = convertDateFormate(start_date);
        end_date = convertDateFormate(end_date);
        try {
            props.setProgress(10);
            const response = await fetch(backendURL + `/transaction/filtertransaction?start_date=${start_date}&end_date=${end_date}`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                    'user-auth-token': localStorage.getItem('cash-calc-1@#1-auth-token'),
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
                document.getElementById('filterBtn').disabled = false;
                return;
            }

            setTransactions(resultData.data);

            document.getElementById('filterBtn').disabled = false;
        } catch (error) {
            document.getElementById('filterBtn').disabled = false;
            props.setAppAlert({
                bg: "danger",
                message: "Internal Server Error !",
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

    async function handleApplyFilter() {
        let start_date = document.getElementById("start_date").value;
        let end_date = document.getElementById("end_date").value;
        document.getElementById('filterBtn').disabled = true;
        if (start_date && end_date) {
            filterTransaction(start_date, end_date);
        }
        else {
            props.setAppAlert({
                bg: "danger",
                message: "You must fill both start and end date to filter",
                display: "block"
            });
            setTimeout(() => {
                props.setAppAlert({
                    bg: "warning",
                    message: "",
                    display: "none"
                });
            }, 2000);
            document.getElementById('filterBtn').disabled = false;
            return;
        }

    }

    useEffect(() => {
        fetchTransactionDetails();
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        let CreditAmt = 0;
        let DeditAmt = 0;
        transactions.forEach(element => {
            if (element.type === "Credit" || element.type === "credit") {
                CreditAmt += parseInt(element.amount);
            }
            else {
                DeditAmt += parseInt(element.amount);
            }

        });
        setTodayTotalCreditAmt(CreditAmt);
        setTodayTotalDebitAmt(DeditAmt);
        // eslint-disable-next-line
    }, [transactions])
    return (
        <>

            <div className="container-fluid">
                <div className="row mb-5">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h5 className="text-center filterHeading m-0 me-2">Filter</h5> <span className='cursor-pointer'
                            onClick={fetchTransactionDetails}><u>Clear Filter</u></span>
                    </div>
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
                    <div className="col-12 text-center">
                        <button className='btn registerBtn box-shadow-none text-light' id='filterBtn' onClick={handleApplyFilter}><b>Apply Filter</b></button>
                    </div>
                </div>
                <div className="transactionChart row">

                    <div className="col-12 col-sm-5 col-md-4 col-lg-3 mb-4">
                        <div className="charts bg-black text-light">

                            <h6 className="lineChartHeading d-flex align-items-center gap-2 mb-3"><i className="bi bi-coin"></i> <b>Total Amt </b></h6>
                            <span className='todayTotalAmt' id='todayTotalAmt'>{todayTotalCreditAmt + todayTotalDebitAmt} <i className="bi bi-currency-rupee"></i></span>

                        </div>
                    </div>
                    <div className="col-12 col-sm-5 col-md-4 col-lg-3 mb-4">
                        <div className="charts bg-3399FF text-light">

                            <h6 className="lineChartHeading d-flex align-items-center gap-2 mb-3"><i className="bi bi-coin"></i> <b>Total Credit </b></h6>
                            <span className='todayTotalAmt' id='todayTotalAmt'>{todayTotalCreditAmt} <i className="bi bi-currency-rupee"></i></span>

                        </div>
                    </div>
                    <div className="col-12 col-sm-5 col-md-4 col-lg-3 mb-4">
                        <div className="charts bg-E55353 text-light">

                            <h6 className="lineChartHeading d-flex align-items-center gap-2 mb-3"><i className="bi bi-coin"></i> <b>Total Debit </b></h6>
                            <span className='todayTotalAmt' id='todayTotalAmt'>{todayTotalDebitAmt} <i className="bi bi-currency-rupee"></i></span>

                        </div>
                    </div>

                    <div className="col-12 mb-4">
                        <div className="charts">
                            <h5 className="lineChartHeading"><b>Transactions:</b></h5>
                            <br />
                            <DetailedTable data={transactions} setAppAlert={props.setAppAlert} setProgress={props.setProgress} fetchTransactionDetails={fetchTransactionDetails} />
                        </div>
                    </div>
                </div>
                <br />
            </div>
        </>
    )
}

export default Transaction