import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Container } from "reactstrap";
import { Link } from "react-router-dom";
import api from "../../Axios";
import NotificationAlert from "react-notification-alert";
import Usercard from "../../components/Usercard";
import SearchField from "../../components/SearchField";
const Unpaid = () => {
  const [data, setData] = useState([]);
  const [render, setRerender] = useState(false);
  const [unpaid, setUnpaid] = useState([]);
  useEffect(() => {
    api.get("/admin/allUsers/getUnpaidUsers").then((res) => {
      setUnpaid(res.data.data);

      console.log(res.data.data);

      Array.isArray(res.data.data) && res.data.data.map((dat) => dat.images);
    });
  }, []);

  const searchMember = () => {
    let search = document.getElementById("search_id").value;
    api
      .post("/admin/manageUserProfile/searchUserByKeyword", {
        searchData: search,
        query: "unpaid",
      })
      .then((v) => {
        setUnpaid(v.data.data);
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
                  UnPaid Members
                </h1>
              </div>
              <SearchField onSearch={() => searchMember()} />
            </div>

            <Row>
              {Array.isArray(unpaid) && unpaid.length > 0 ? (
                unpaid.map((user, index) => {
                  return (
                    <Usercard
                      key={index}
                      name={user.userName}
                      image={user.images}
                      age={user.age}
                      gender={user.gender}
                      dob={user.dob}
                      state={user.state}
                      status={user.status}
                    />
                  );
                })
              ) : (
                 <div style={{marginLeft:"500px",marginTop:"250px"}}>
                <h3 > Profile  Not   Found</h3>
                </div>
              )}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Unpaid;
