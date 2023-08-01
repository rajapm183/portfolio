import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Container } from "reactstrap";
import { Link } from "react-router-dom";
import api from "../../Axios";
import NotificationAlert from "react-notification-alert";
import Usercard from "../../components/Usercard";
import SearchField from "../../components/SearchField";

const InactiveMember = () => {
  const [data, setData] = useState([]);
  const [render, setRerender] = useState(false);
  const [inactive, setInactive] = useState([]);
  useEffect(() => {
    api.get("/admin/adminDashboard/inactiveMembers").then((res) => {
      setInactive(res.data.data);
    });
  }, []);
  function deletee(i) {
    api.post("/admin/manageuserProfile/deleteUser", { id: i.id }).then(() => {
      api.get("/admin/adminDashboard/inactiveMembers").then((res) => {
        setInactive(res.data.data);
      });
    });
  }

  const searchMember = () => {
    let search = document.getElementById("search_id").value;
    api
      .post("/admin/adminDashboard/inactiveMembersSearch", {
        searchData: search,
        query: "inactive",
      })
      .then((v) => {
        setInactive(v.data.data);
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
                  Inactive Members
                </h1>
              </div>
              <SearchField onSearch={() => searchMember()} />
            </div>

            <Row>
              {Array.isArray(inactive) && inactive.length > 0 ? (
                inactive.map((user, index) => {
                  console.log("user id : ", user.id);
                  return (
                    <Usercard
                      key={index}
                      id={user.id}
                      name={user.userName}
                      image={user.images}
                      age={user.age}
                      gender={user.gender}
                      dob={user.dob}
                      state={user.state}
                      status={user.status}
                      onDelete={() => deletee(user)}
                  
                    />
                  );
                })
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
