import React, { useEffect, useState, useRef } from "react";
import {  Row, Col } from "reactstrap";
const PaymentLog = () => {
  return (
    <Row>
        <Col>
    <div className="container-fluid p-3 mt-5" >
    <section className="box ">
        <table class="table table-sm mt-3">
            <thead class="thead" style={{ backgroundColor: "black", color: "white" }}>
                <th style={{ textAlign: "center" ,padding:"10px",fontSize:"16px"}}>S No</th>
                <th style={{ textAlign: "center",padding:"10px",fontSize:"16px" }}>Date</th>
                <th style={{ textAlign: "center",padding:"10px",fontSize:"16px" }}>Name</th>
                <th style={{ textAlign: "center",padding:"10px" }}>Order Id</th>
                <th style={{ textAlign: "center",padding:"10px" }}>Amount</th>
                <th style={{ textAlign: "center",padding:"10px" }}>Payment Id</th>
                <th style={{ textAlign: "center",padding:"10px" }}>Amount</th>
                <th style={{ textAlign: "center",padding:"10px" }}>Phone No</th>
                <th style={{ textAlign: "center",padding:"10px" }}>Plan</th>
                <th style={{ textAlign: "center",padding:"10px" }}> Status</th>
          
            </thead>
            <tbody>

              
                    
                    <tr>
                       
                        <td style={{ textAlign: "center",color:"#000",fontWeight:"500" }}></td>
                        <td style={{ textAlign: "center" }}></td>
                        <td style={{ textAlign: 'center' }}></td>
                        <td style={{ textAlign: "center" }}></td>
                        <td style={{ textAlign: 'center' }}></td>
                        <td style={{ textAlign: "center" }}></td>
                    </tr>                             
            </tbody>
        </table>
        </section>
    </div>
  </Col>
</Row>
  )
}

export default PaymentLog