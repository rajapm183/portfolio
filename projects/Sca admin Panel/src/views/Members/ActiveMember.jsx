import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Container } from "reactstrap";
import { Link } from "react-router-dom";
import api from "../../Axios";
import "./members.css";
import Usercard from "../../components/Usercard";
import SearchField from "../../components/SearchField";
const InactiveMember = () => {
  const [data, setData] = useState([]);
  const [render, setRerender] = useState(false);
  const [active, setActive] = useState([]);
  useEffect(() => {
    api.get("/admin/adminDashboard/activeMembers").then((res) => {
      setActive(res.data.data);
    });
  }, []);
  function deletee(i) {
    api.post("/admin/manageuserProfile/deleteUser", { id: i.id }).then(() => {
      api.get("/admin/allUsers/getRecentUsers").then((res) => {
        setActive(res.data.data);
      });
    });
  }

  const searchMember = () => {
    let search = document.getElementById("search_id").value;
    api
      .post("/admin/manageuserprofile/searchUser", {
        searchData: search,
        query: "active",
      })
      .then((v) => {
        setActive(v.data.data);
      });  
  };

  return (
    <div>
      <div className="content">
        <div className="notification-popup"></div>
        <Row>
          <Col xs={12} md={12}>
            <div className="page-title">
              <div className="float-left">
                <h1 className="title" style={{ textTransform: "capitilize" }}>
                  Active Members
                </h1>
              </div>
              <SearchField onSearch={() => searchMember()} />
            </div>
            <Row>
              {Array.isArray(active) && active.length > 0 ? (
                active.map((user, index) => (
                  <Usercard
                  key={index}
                    id={user.id}
                    name={user.userName}
                    image={user.images}
                    age={user.age}
                    gender={user.gender}
                    dob={user.dob}
                    status={user.status}
                    state={user.state}
                    onDelete={() => deletee(user)}
                  />
                ))
              ) : (
                <div style={{marginLeft:"500px",marginTop:"250px"}}>
                <h3> Profile  Not   Found</h3>
                </div>
              )}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default InactiveMember;
