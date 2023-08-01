import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Container } from "reactstrap";
import { Link } from "react-router-dom";
import api from "../../Axios";
import NotificationAlert from "react-notification-alert";
import Usercard from "../../components/Usercard";
import SearchField from "../../components/SearchField";
const Paid = () => {
  const [data, setData] = useState([]);
  const [render, setRerender] = useState(false);
  const [active, setActive] = useState([]);
  useEffect(() => {
    api.get("/admin/allUsers/getPaidUsers").then((res) => {
      setActive(res.data.data);

      console.log(res.data.data);

      Array.isArray(res.data.data) && res.data.data.map((dat) => dat.images);
    });
  }, []);

  const searchMember = () => {
    let search = document.getElementById("search_id").value;
    api
      .post("admin/manageUserProfile/searchUserByKeyword", {
        searchData: search,
        query: "paid",
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
                  Paid Members
                </h1>
              </div>
              <SearchField onSearch={() => searchMember()} />
            </div>
            <Row>
              {Array.isArray(active) && active.length > 0 ? (
                active.map((user, index) => {
                  return (
                    <Usercard
                      image={user.images}
                      age={user.age}
                      id={user.id}
                      dob={user.dob}
                      name={user.userName}
                      gender={user.gender}
                      state={user.state}
                      status={user.status}
                      key={user.id}
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

export default Paid;
