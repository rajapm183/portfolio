import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import api from "../../Axios";
import CancelledUser from "../../components/CancelledUser";
import SearchField from "../../components/SearchField";
const CancelledUsers = () => {
  // const [data, setData] = useState([]);
  // const [render, setRerender] = useState(false);
  const [cancelled, setCancelled] = useState([]);
  useEffect(() => {
    api.get("/admin/adminDashboard/cancelledUsers").then((res) => {
      setCancelled(res.data.data);

      console.log(res.data.data);

      // Array.isArray(res.data.data) && res.data.data.map((dat) => dat.images);
    });
  }, []);
  const searchMember = () => {
    let search = document.getElementById("search_id").value;
    api
      .post("/admin/manageUserProfile/searchUserByKeyword", {
        searchData: search,
        query: "cancelled",
      })
      .then((v) => {
        setCancelled(v.data.data);
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
                  Cancelled Members
                </h1>
              </div>
              <SearchField onSearch={() => searchMember()} />
            </div>

            <Row>
              {Array.isArray(cancelled) && cancelled.length > 0 ? (
                cancelled.map((user, index) => {
                  return (
                    <CancelledUser
                      key={index}
                      id={user.id}
                      name={user.userName}
                      profileId={user.profileId}
                      image={user.images}
                      email={user.email}
                      phone={user.phone}
                      // status={user.status}
                    />
                  );
                })
              ) : (
                <div style={{ marginLeft: "500px", marginTop: "250px" }}>
                  <h3> Profile Not Found</h3>
                </div>
              )}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CancelledUsers;
