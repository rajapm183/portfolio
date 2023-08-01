import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Container } from "reactstrap";
import { Link } from "react-router-dom";
import api from "../../Axios";
import NotificationAlert from "react-notification-alert";
import Usercard from "../../components/Usercard";
import SearchField from "../../components/SearchField";

const Allmembers = () => {
  const [data, setData] = useState([]);
  const [render, setRerender] = useState(false);
  const [getuser, setGetuser] = useState([]);
  const [verified, setVerified] = useState("Verify");

  useEffect(() => {
    api.get("/admin/allUsers/getAllUsers").then((res) => {
      setGetuser(res.data.data);
    });
  }, []);

  const searchMember = () => {
    let search = document.getElementById("search_id").value;
    api
      .post("/admin/manageuserprofile/searchUser", {
        searchData: search,
        query: "all",
      })
      .then((v) => {
        setGetuser(v.data.data);
      });
  };

  // function verify(i) {
  //   api.post("/admin/adminDashboard/imageVerified", { id: i.id }).then(() => {
  //     api.get("/admin/allUsers/getAllUsers").then((res) => {
  //       setGetuser(res.data.data);
  //       setVerified("Verified");
  //     });
  //   });
  // }
  function deletee(i) {
    api.post("/admin/manageuserProfile/terminateUser", { id: i.id }).then(() => {
      api.get("/admin/allUsers/getAllUsers").then((res) => {
        setGetuser(res.data.data);
      });
    });
  }
  function activeinactive(i) {
    api.post("/admin/manageuserProfile/deleteUser", { id: i.id }).then(() => {
      api.get("/admin/allUsers/getAllUsers").then((res) => {
        setGetuser(res.data.data);
      });
    });
  }
  return (
    <div style={{overflow:"hidden"}}>
      <div className="content">
        <div className="notification-popup"></div>
        <Row>
          <Col xs={12} md={12}>
            <div className="page-title">
              <div className="float-left">
                <h1 className="title" style={{ textTransform: "capitilize" }}>
                  All Members
                </h1>
              </div>
              <SearchField onSearch={() => searchMember()} />
            </div>

            <Row>
              {Array.isArray(getuser) && getuser.length > 0 ? (
                getuser.map((user, index) => {
                  console.log("users :", user);
                  return (
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
                      onActive={() => activeinactive(user)}
                      onDelete={() => deletee(user)}
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

export default Allmembers;
