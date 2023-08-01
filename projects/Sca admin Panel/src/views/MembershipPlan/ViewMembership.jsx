import React, { useEffect, useState, useRef } from "react";
import {  Row, Col,Table } from "reactstrap";
import "../Banner/banner.css";
import api from "../../Axios";
import NotificationAlert from "react-notification-alert";
import { Link } from "react-router-dom";
const ViewMembership = () => {
  const notiRef = useRef();
 

  const [membershiplist, setMembershipList] = useState();
  const [render, setRender] = useState(false);

  function deletee(i) {
    // console.log(i);
    api
      .post("/admin/membership/deleteMembership", {
        id: i.id,
        selectPlan: i.selectPlan,
        name: i.name,
      })
      .then(() => {
        api.get("/admin/membership/viewAllMembership").then((res) => {
          console.log(res.data.data);
          setMembershipList(res.data.data);
        });
      });
  }
  useEffect(() => {
    api.get("/admin/membership/viewAllMembership").then((res) => {
      // console.log(res.data.data);
      setMembershipList(res.data.data);
    });
  }, [render]);

  return (
    <div>
      <div className="content">
        <div className="notification-popup">
          <NotificationAlert ref={notiRef} />
        </div>
        <Row>
          <Col xs={12} md={12}>
            <Row>
              <div className="container-fluid p-3 mt-5">
                <section className="box">
                  <Table>
                    <thead
                      style={{
                        background: "black",
                        color: "white",
                        marginLeft: "10px",
                      }}
                    >
                      <tr>
                        <th style={{ textAlign: "center" }}>S No</th>
                        <th style={{ textAlign: "center" }}>Plan Name</th>
                        <th style={{ textAlign: "center" }}>Name</th>
                        <th style={{ textAlign: "center" }}>Period</th>
                        <th style={{ textAlign: "center" }}>Duration</th>
                        <th style={{ textAlign: "center" }}>Description</th>
                        <th style={{ textAlign: "center" }}>Total</th>
                        <th style={{ textAlign: "center" }}>Gst</th>
                        <th style={{ textAlign: "center" }}>Discount</th>
                        <th style={{ textAlign: "center" }}>Grand Total</th>
                        <th style={{ textAlign: "center" }}>Access Phn Number</th>
                        <th style={{ textAlign: "center" }}>Status</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(membershiplist) && membershiplist.length > 0 ? (
                       membershiplist.map((membership, index) => (
                        <tr key={index} >
                        <td
                          style={{
                            textAlign: "center",
                            color: "#000",
                            fontWeight: "500"
                          }}
                        >
                          {" "}
                          {index + 1}
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            color: "#000",
                            fontWeight: "500",
                          }}
                        >
                          {membership.selectPlan}
                        </td>

                        <td
                          style={{
                            textAlign: "center",
                            color: "#000",
                            fontWeight: "500",
                          }}
                        >
                          {membership.name}
                        </td>

                        <td
                          style={{
                            textAlign: "center",
                            color: "#000",
                            fontWeight: "500",
                          }}
                        >
                          {membership.period}
                        </td>

                        <td
                          style={{
                            textAlign: "center",
                            color: "#000",
                            fontWeight: "500",
                          }}
                        >
                          {membership.duration}
                        </td>

                        <td
                          style={{
                            textAlign: "center",
                            color: "#000",
                            fontWeight: "500",
                          }}
                        >
                          {membership.descriptions}
                        </td>

                        <td
                          style={{
                            textAlign: "center",
                            color: "#000",
                            fontWeight: "500",
                          }}
                        >
                          {membership.total}
                        </td>

                        <td
                          style={{
                            textAlign: "center",
                            color: "#000",
                            fontWeight: "500",
                          }}
                        >
                          {membership.gst}
                        </td>

                        <td
                          style={{
                            textAlign: "center",
                            color: "#000",
                            fontWeight: "500",
                          }}
                        >
                          {membership.discount}
                        </td>

                        <td
                          style={{
                            textAlign: "center",
                            color: "#000",
                            fontWeight: "500",
                          }}
                        >
                          {membership.grandTotal}
                        </td>
                        <td
                        style={{
                          textAlign: "center",
                          color: "#000",
                          fontWeight: "500",
                        }}
                      >
                        {membership.accessMobile}
                      </td>
                        <td style={{ textAlign: "center" }}>
                          <span
                            href="#"
                            className="btn"
                            onClick={() => deletee(membership)}
                            style={{
                              fontSize: "10px",
                              fontWeight: "500",
                              background:
                                membership.status == "active"
                                  ? "green"
                                  : "#00008B",
                              color: "white",
                              padding: "10px",
                            }}
                          >
                            {membership.status}
                          </span>
                        </td>

                        <td style={{ textAlign: "center" }}>
                          <Link
                            
                            to={`/editmembership/${membership.selectPlan}/${membership.name}/${membership.id}`}
                          >
                            <span
                              className="badge"
                              style={{
                                cursor: "pointer",
                                background: "red",
                                color: "#fff",
                                padding: "10px",
                                // marginLeft:"20px"
                              }}
                            >
                              <span>Edit</span>
                            </span>
                          </Link>

                        </td>                 
                      </tr>
                        ))
                      ) : (
                        <div>
                          <p>Profile Not Found</p>
                        </div>
                      )}
                    </tbody>
                  </Table>
                </section>
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ViewMembership;
