import React, { useEffect, useRef, useState } from 'react'
import './css/Home.css';
import Table from './Table';

import { useNavigate } from 'react-router-dom';
export const Home = (props) => {
  let navigate=useNavigate();
  const backendURL = "https://cash-calc-backend.vercel.app";


  const ref = useRef(null);

  const [alert, setAlert] = useState({
    bg: "warning",
    message: "",
    display: "none"
  });
  const [todayTotalCreditAmt, setTodayTotalCreditAmt] = useState(0);
  const [todayTotalDebitAmt, setTodayTotalDebitAmt] = useState(0);
  const [transactions, setTransactions] = useState([]);

  async function fetchTransactionDetails() {
    if (!localStorage.getItem('cash-calc-1@#1-auth-token')) {
      navigate("/login");
      // window.location.href = "/cash-calc/login";
      return ;
    }
    props.setProgress(10);
    const response = await fetch(backendURL + "/transaction/todaytransaction", {
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
      return;
    }
    setTransactions(resultData.data);
  }

  async function handleNewTransaction() {
   
    let transactionAmount = document.getElementById('transactionAmount').value;
    let transactionType = document.getElementById('typeCredit').checked ? "Credit" : null;
    
    if (transactionType===null) {
      transactionType = document.getElementById('typeDebit').checked ? "Debit" : null;
    }

    if (transactionType === null) {
     setAlert({
        bg: "warning",
        message: "Please fill required details !",
        display: "block"
      });
      setTimeout(() => {
       setAlert({
          bg: "warning",
          message: "",
          display: "none"
        });
      }, 2000);
      return ;
    }
    
    let transactionNote = document.getElementById('transactionNote').value;
    if (valididateInputVal(transactionAmount) && valididateInputVal(transactionType)) {

      let data = {};
      data["amount"] = transactionAmount;
      data["type"] = transactionType;
      data["note"] = transactionNote;
      try {
        props.setProgress(10);
        const response = await fetch(backendURL + "/transaction/newtransaction", {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            'user-auth-token': localStorage.getItem('cash-calc-1@#1-auth-token')
          },
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        props.setProgress(60);

        const resultData = await response.json();
        props.setProgress(100);

        if (!resultData.success) {
         setAlert({
            bg: "danger",
            message: resultData.message,
            display: "block"
          });
          setTimeout(() => {
           setAlert({
              bg: "warning",
              message: "",
              display: "none"
            });
          }, 2000);
          document.getElementById('addBtn').disabled = false;
          return;
        }
        document.getElementById('transactionAmount').value = "";
        document.getElementsByName('transactionType')[0].checked = false;
        document.getElementsByName('transactionType')[1].checked = false;
        document.getElementById('transactionNote').value = "";
        setAlert({
          bg: "success",
          message: "Successfully saved !",
          display: "block"
        });
        setTimeout(() => {
          setAlert({
            bg: "warning",
            message: "",
            display: "none"
          });
        }, 2000);
        fetchTransactionDetails();

      } catch (error) {
        setAlert({
          bg: "danger",
          message: error.message,
          display: "block"
        });
        setTimeout(() => {
          setAlert({
            bg: "warning",
            message: "",
            display: "none"
          });
        }, 2000);
        document.getElementById('addBtn').disabled = false;
        return 0;
      }
     
    }
    else {
      setAlert({
        bg: "warning",
        message: "Please fill required details !",
        display: "block"
      });
      setTimeout(() => {
        setAlert({
          bg: "warning",
          message: "",
          display: "none"
        });
      }, 2000);
    }

  }

  function valididateInputVal(inputVal) {
    return inputVal && inputVal !== "" && inputVal !== 0;
  }

  
  useEffect(() => {
    fetchTransactionDetails();
   // eslint-disable-next-line
 }, [])

  useEffect(() => {
    let CreditAmt = 0;
    let DeditAmt = 0;
    transactions.forEach(element => {
      if (element.type==="Credit" || element.type==="credit") {
        CreditAmt += parseInt(element.amount);
      }
      else{
        DeditAmt += parseInt(element.amount);
      }
      
    });
    setTodayTotalCreditAmt(CreditAmt);
    setTodayTotalDebitAmt(DeditAmt);
    // eslint-disable-next-line
  }, [transactions])


  return (
    localStorage.getItem('cash-calc-1@#1-auth-token') && <>
      <div className="container-fluid">

        <button className='newTransactionBtn' data-bs-toggle="modal" data-bs-target="#newTranctionModal"><b><i className="bi bi-plus-lg me-1"></i> Transaction</b></button>

        <div className="transactionChart row ">
          <div className="col-12">
            <h3 className="text-center mb-4"><b>Today's Transactions :</b></h3>
          </div>
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

          <div className="col-12 col-md-12 mb-4">
            <div className="charts">
              <h5 className="lineChartHeading"><b>Transactions:</b></h5>
              <br />
              <Table data={transactions} />
            </div>
          </div>
        </div>
        <br /><br />

      </div>

      <div className="modal fade" id="newTranctionModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content overflow-auto">
            <div className="modal-header">
              <h5 className="modal-title" >New Transaction</h5>
              <button type="button" ref={ref} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="position-relative">
            <div className={`alert alert-${alert.bg} d-${alert.display} p-2 absolute-top z-index-100`} role="alert">
              {alert.message}
            </div>
            </div>
            <div className="modal-body min-height">
              <div className="mb-2">
                <label htmlFor="transactionAmount"><b>Transaction Amt</b> <span className='text-danger'>*</span></label>
                <input type="text" className="form-control outline-none box-shadow-none" id="transactionAmount" placeholder='Enter Amount' />
              </div>
              <div className="mb-2">
                <label htmlFor="transactionType"><b>Transaction Type</b> <span className='text-danger'>*</span></label>
                <div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input box-shadow-none" type="radio" name="transactionType" id="typeCredit" />
                    <label className="form-check-label" htmlFor="typeCredit">
                      Credit
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input box-shadow-none" type="radio" name="transactionType" id="typeDebit" />
                    <label className="form-check-label" htmlFor="typeDebit">
                      Debit
                    </label>
                  </div>
                </div>
              </div>
              <div className="">
                <label htmlFor="transactionNote"><b>Add a Note</b> <span className='text-danger'></span></label>
                <textarea name="transactionNote" id="transactionNote" className='form-control outline-none box-shadow-none' rows="3" placeholder='Add a Note'></textarea>
              </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="closeBtn" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={handleNewTransaction} id="addBtn" className="addBtn">Add</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
