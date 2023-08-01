import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Container } from "reactstrap";
import {Link} from 'react-router-dom'
import api, { baseURL } from "../../Axios";
import NotificationAlert from "react-notification-alert";

const BlockedMembers = () => {
  const [data, setData] = useState([]);
  const [render, setRerender] = useState(false);
  const [blocked, setBlocked] = useState([]);
  useEffect(() => {
    api.get("/admin/allUsers/getRecentUsers").then((res) => {
      setBlocked(res.data.data);
      
      console.log(res.data.data);
 
      Array.isArray(res.data.data) && res.data.data.map((dat)=>(
      
        dat.images
     
      ))
    });
  }, []);
  function deletee(i){
    api.post("/admin/manageuserProfile/deleteUser", {id:i.id} ).then(()=>{
    
    api.get("/admin/allUsers/getRecentUsers").then((res) => {
      setBlocked(res.data.data);
    });

})
}


  return (
    <div>
      <div className="content">
        <div className="notification-popup">
          
        </div>
        <Row>
          <Col xs={12} md={12}>
            <div className="page-title">
              <div className="float-left">
                <h1 className="title" style={{ textTransform: "capitilize" }}>
                  Blocked Members
                </h1>
              </div>
            </div>

            <section className="box ">
            <Row>
            
            {Array.isArray(blocked) && blocked.length > 0 ? blocked.map((user, index) => (
          <Col xs={12} md={6} lg={4}>
            <div
              class="card"
              style={{
                margin: "20px 30px ",
                width: "25rem",
                padding: "30px 20px",
              }}
            >
              <Container>
                <div class="over" style={{ marginTop: "20px" }}>
                   <img
                        src=
                        {baseURL+ user.images} 
                        style={{ width: "200px", height: "200px" }}
                        alt="..."
                      />
                    </div>
                   
                    <div class="card-body">
                      <h5 class="card-title" style={{ color: "#eb3143" }}>
                      {user.userName}
                      </h5>

                      <ul class="list">
                      <li>Gender:
                          {user.gender}
                          </li>
                        <li>Age:
                          {user.age}
                          </li>
                       
                        <li>DOB:
                          {user.dob}
                          </li>
                        <li>State:
                          {user.state}
                          </li>
                          <li>Ph.No:
                          {user.phone}
                          </li>
                          <li>Email:
                          {user.email}
                          </li>
                      </ul> 
                </div>
              </Container>

              <div
                class="btns"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Link
                  to={"/dashboard1/" + user.id}
                  class="btn"
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    background: "green",
                    color: "white",
                  }}
                >
                  <i class="bi bi-eye-fill"></i> View
                </Link>
               
                <a
                  href="#"
                  class="btn"
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    background: "#eb3143",
                    color: "white",
                  }}
                  onClick={() => deletee(user)} 
                >
                  <i class="bi bi-eye-fill"></i> Delete
                </a>
              </div>
            </div>
          </Col>
            )) :  <div style={{marginLeft:"500px",marginTop:"250px"}}>
            <h3> Profile  Not   Found</h3>
            </div>
            } 
        </Row>
        </section>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BlockedMembers;
