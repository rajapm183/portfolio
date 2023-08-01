import React, { useEffect, useState, useRef } from "react";
import { Row, Col,Table } from "reactstrap";
import api from "../../Axios";
import { baseURL } from "../../Axios";


const Reports = () => {
  const [report, setReport] = useState([]);
  useEffect(() => {
    api.get("/admin/allUsers/viewAllReports").then((res) => {
      setReport(res.data.data);
    });
  }, []);
  console.log(report);

  return (
    <>
      <Row>
        <Col>
          <div className="container-fluid p-3 mt-5">
            <section className="box">
              <Table className="mt-5">
                    <thead
                      style={{
                        background: "black",
                        color: "white",
                        marginLeft: "10px",
                      }}
                    >
                      <tr>
                        <th style={{ textAlign: "center" }}>S No</th>
                        <th style={{ textAlign: "center" }}>Category</th>
                        <th style={{ textAlign: "center" }}>Complaint Details</th>
                        <th style={{ textAlign: "center" }}>Matrimony Id</th>
                        <th style={{ textAlign: "center" }}>Report Status</th>
                        <th style={{ textAlign: "center" }}>Evidence</th>
                        <th style={{ textAlign: "center" }}>Reported Person</th>
                        <th style={{ textAlign: "center" }}>Email</th>
                        <th style={{ textAlign: "center" }}>Profile Id</th>
                        <th style={{ textAlign: "center" }}>Phone Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(report) && report.length > 0 ? (
                        report.map((use, index) => (
                          <tr key={index}>
                            <td
                              style={{
                                textAlign: "center",
                                color: "#000",
                                fontWeight: "500",
                              }}
                            >
                              {index + 1}
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                color: "#000",
                                fontWeight: "500",
                                textTransform: "capitalize",
                              }}
                            >
                              {use.abuseCategory}
                            </td>

                            <td
                              style={{
                                textAlign: "center",
                                color: "#000",
                                fontWeight: "500",
                                textTransform: "capitalize",
                              }}
                            >
                              {use.complaintDetails}
                            </td>

                            <td
                              style={{
                                textAlign: "center",
                                color: "#000",
                                fontWeight: "500",
                                textTransform: "capitalize",
                              }}
                            >
                              {use.matrimonyId}
                            </td>

                            <td
                              style={{
                                textAlign: "center",
                                color: "#000",
                                fontWeight: "500",
                                textTransform: "capitalize",
                              }}
                            >
                              {use.reportStatus}
                            </td>

                            {use.evidence ? (
                          <td
                            style={{
                              textAlign: "center",
                              textTransform: "capitalize",
                            }}
                          >
                            <img style={{width:"70px",height:"70px"}} src={baseURL+ use.evidence} alt=""/>
                          </td>
                        ) : (
                          <td
                            style={{
                              textAlign: "center",
                              textTransform: "capitalize",
                            }}
                          >
                            No Evidence
                          </td>
                        )}
  <td
                          style={{
                            textAlign: "center",
                            textTransform: "capitalize",
                          }}
                        >
                            {use.user?use.user.userName:""}
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            textTransform: "capitalize",
                          }}
                        >
                            {use.user?use.user.email:""}
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            textTransform: "capitalize",
                          }}
                        >
                          {use.user?use.user.profileId:""}
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                            textTransform: "capitalize",
                          }}
                        >
                          {use.user?use.user.phone:""}
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
        </Col>
      </Row>
    </>
  );
};

export default Reports;
