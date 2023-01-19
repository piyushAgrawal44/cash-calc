import React, { useEffect, useRef, useState } from 'react'
import './css/Home.css';
import Table from './Table';

export const Home = () => {

  
  // if(!localStorage.getItem('cash-calc-1@#1-auth-token')){
  //   window.location.href="/login";
  // }

 

  const data=[
    {transactionAmount: 100, transactionType: "Credit", transactionNote: "Payment recevied from aman"},
    {transactionAmount: 200, transactionType: "Credit", transactionNote: "Payment recevied from aman"},
    {transactionAmount: 300, transactionType: "Credit", transactionNote: "Payment recevied from aman"},
    {transactionAmount: 400, transactionType: "Debit", transactionNote: "Payment given to sahu"},
  ];
  const ref = useRef(null);

  const [alert, setAlert] = useState({
    bg:"warning",
    message:"",
    display: "none"
  });
  const [todayTotalAmt, setTodayTotalAmt] = useState(0);

  function fetchTransactionDetails(){
    // Todo API Call
    setTodayTotalAmt(100);
  }
  function handleNewTransaction() {
    let transactionAmount = document.getElementById('transactionAmount').value;
    let transactionType = document.getElementById('transactionType').value;
    // eslint-disable-next-line
    let transactionNote = document.getElementById('transactionNote').value;

    if (valididateInputVal(transactionAmount) && valididateInputVal(transactionType)) {
        // API call todo
        document.getElementById('transactionAmount').value="";
        document.getElementById('transactionType').value="";
        document.getElementById('transactionNote').value="";
        setAlert({
          bg:"success",
          message:"Successfully saved !",
          display: "block"
        });
        setTimeout(() => {
          setAlert({
            bg:"warning",
            message:"",
            display: "none"
          });
        }, 2000);
        // ref.current.click();
    }
    else {
      setAlert({
        bg:"warning",
        message:"Please fill required details !",
        display: "block"
      });
      setTimeout(() => {
        setAlert({
          bg:"warning",
          message:"",
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
  }, [])
  
 
  return (
    <>
      <div className="container-fluid">
        
        <button className='newTransactionBtn' data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="bi bi-plus-circle me-1"></i> Transaction</button>
        

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">New Transaction</h5>
                <button type="button" ref={ref} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className={`alert alert-${alert.bg} d-${alert.display} p-2 mx-2 mb-1`} role="alert">
                {alert.message}
              </div>
              <div className="modal-body">
                <div className="mb-2">
                  <input type="text" className="form-control outline-none box-shadow-none" id="transactionAmount" placeholder='Enter Amount *' />
                </div>
                <div className="mb-2">
                  <select className="form-control form-select outline-none box-shadow-none" id='transactionType'>
                    <option className='form-control' value="" defaultValue >Select Type *</option>
                    <option className='form-control' value="credit">Credit</option>
                    <option className='form-control' value="debit">Debit</option>
                  </select>
                </div>
                <div className="">
                  <textarea name="transactionNote" id="transactionNote" className='form-control outline-none box-shadow-none' rows="3" placeholder='Add a Note'></textarea>
                </div>

              </div>
              <div className="modal-footer">
                <button type="button" className="closeBtn" data-bs-dismiss="modal">Close</button>
                <button type="button" onClick={handleNewTransaction} className="addBtn">Add</button>
              </div>
            </div>
          </div>
        </div>

        <div className="transactionChart row mt-5 ">
          <div className="col-12 col-sm-5 col-md-4 col-lg-3 mb-4">
            <div className="charts bg-black text-light">
              
                <h6 className="lineChartHeading d-flex align-items-center gap-2 mb-3"><i className="bi bi-coin"></i> <b>Today's Total Transaction </b></h6>
                <span className='todayTotalAmt' id='todayTotalAmt'>{todayTotalAmt} <i class="bi bi-currency-rupee"></i></span>
                
            </div>
          </div>
       
          <div className="col-12 col-md-12 mb-4">
              <div className="charts">
                <h5 className="lineChartHeading"><b>Today's Transactions:</b></h5>
                <br />
                <Table data={data} />
              </div>
          </div>
        </div>
        <br /><br />

      </div>
    </>
  )
}
