import React, { useEffect, useState, useRef } from "react";
import {  Row, Col ,Container} from "reactstrap";
import { useParams } from "react-router-dom";
import api from "../../../Axios";
const UserfullDetails = (props) => {
  const notiRef = useRef();
 const [userdetails, setUserdetails] = useState([]);
  const [data, setData] = useState([]);
  const [render, setRerender] = useState(false);
  const {id} = useParams()
  // useEffect(() => {
  //   api.post("/admin/adminDashboard/userFullDetails", {id:2} ).then((res) => {
  //     console.log(res.data.data);
  //     setUserdetails(res.data.data);
  //   });
  // }, []);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
  return (
    <div className="col-12">
      <Row>
      {Array.isArray(userdetails) && userdetails.length > 0 ? userdetails.map((details, index) => (
          <Col xs={12} md={12}>
            <div className="page-title">
              <div className="float-left">
                <h1 className="title">Members Full Profile</h1>
              </div>
            </div>
            <div className="col-12">
              <section className="box ">
                <header className="panel_header">
                  <h2 className="title float-left">Profile</h2>
                  <span
                    class="badge  mt-4 "
                    style={{
                      borderRadius: "10px",
                      fontWeight: "500",
                      backgroundColor: "black",
                    }}
                  >
                    {" "}
                    Profile Id: {details.profileId}
                  </span>
                </header>
                <div className="content-body">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                      <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80" />
                    </div>
                    <div
                      className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8"
                      style={{ padding: "0px" }}
                    >
                      <h5
                        style={{
                          padding: "8px 15px",
                          backgroundColor: "#e7e5e5c0",
                          color: "red",
                        }}
                      >
                        Profile Details
                      </h5>
                      <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-6">
                          <table
                            class="table  table-borderless"
                            style={{ border: "none" }}
                          >
                            <tbody>
                              <tr>
                                <td style={{ borderTop: "none" }}>Username</td>
                                <td style={{ borderTop: "none" }}>{details.userName}</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>
                                  Date of Birth
                                </td>
                                <td style={{ borderTop: "none" }}>
                                  19.02.1999
                                </td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>Age</td>
                                <td style={{ borderTop: "none" }}>20</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>Ph. No</td>
                                <td style={{ borderTop: "none" }}>
                                  9874563210
                                </td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>Gender</td>
                                <td style={{ borderTop: "none" }}>Male</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>Email</td>
                                <td style={{ borderTop: "none" }}>
                                  Profile@gmail.com
                                </td>
                              </tr>
                           
                             
                            </tbody>
                          </table>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6">
                          <table
                            class="table  table-borderless"
                            style={{ border: "none" }}
                          >
                            <tbody>
                             
                              <tr>
                                <td style={{ borderTop: "none" }}>Country</td>
                                <td style={{ borderTop: "none" }}>India</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>State</td>
                                <td style={{ borderTop: "none" }}>TamilNadu</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>city</td>
                                <td style={{ borderTop: "none" }}>Erode</td>
                              </tr>
                             
                              <tr>
                                <td style={{ borderTop: "none" }}>Profile Type</td>
                                <td style={{ borderTop: "none" }}>Private</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>Membership Type
                                </td>
                                <td style={{ borderTop: "none" }}>Normal</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>
                                  Payment Status
                                </td>
                                <td style={{ borderTop: "none" }}>Paid</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>Father Occupation</td>
                                <td style={{ borderTop: "none" }}>Normal</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>
                                Mother Occupation
                                </td>
                                <td style={{ borderTop: "none" }}>Paid</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <h5
                        style={{
                          padding: "8px 15px",
                          backgroundColor: "#e7e5e5c0",
                          color: "red",
                        }}
                      >
                        User Details
                      </h5>
                      <div className="row"> 
                        <div className="col-sm-12 col-md-6 col-lg-6">
                          <table
                            class="table  table-borderless"
                            style={{ border: "none" }}
                          >
                            <tbody>
                            <tr>
                                <td style={{ borderTop: "none" }}>Marital Status</td>
                                <td style={{ borderTop: "none" }}>India</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>ProfileCreatedBy</td>
                                <td style={{ borderTop: "none" }}>TamilNadu</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>Whatsapp</td>
                                <td style={{ borderTop: "none" }}>Erode</td>
                              </tr>
                             
                              <tr>
                                <td style={{ borderTop: "none" }}>Refered By</td>
                                <td style={{ borderTop: "none" }}>Private</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>Educational Qualification
                                </td>
                                <td style={{ borderTop: "none" }}>Normal</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>
                                Religion
                                </td>
                                <td style={{ borderTop: "none" }}>Paid</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>
                                Mother Tongue
                                </td>
                                <td style={{ borderTop: "none" }}>Paid</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6">
                          <table
                            class="table  table-borderless"
                            style={{ border: "none" }}
                          >
                            <tbody>
                            <tr>
                                <td style={{ borderTop: "none" }}>Caste</td>
                                <td style={{ borderTop: "none" }}>India</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>Sub Caste</td>
                                <td style={{ borderTop: "none" }}>TamilNadu</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>Profession</td>
                                <td style={{ borderTop: "none" }}>Erode</td>
                              </tr>
                             
                              <tr>
                                <td style={{ borderTop: "none" }}>Profession Designation</td>
                                <td style={{ borderTop: "none" }}>Private</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>Profession Description
                                </td>
                                <td style={{ borderTop: "none" }}>professionDesc</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>
                                Profession Location
                                </td>
                                <td style={{ borderTop: "none" }}>professionLocation</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>
                                Annual Income
                                </td>
                                <td style={{ borderTop: "none" }}>annualIncome</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <h5
                        style={{
                          padding: "8px 15px",
                          backgroundColor: "#e7e5e5c0",
                          color: "red",
                        }}
                      >
                       Family Details
                      </h5>
                      <div className="row"> 
                        <div className="col-sm-12 col-md-6 col-lg-6">
                          <table
                            class="table  table-borderless"
                            style={{ border: "none" }}
                          >
                            <tbody>
                            <tr>
                                <td style={{ borderTop: "none" }}>Father Name</td>
                                <td style={{ borderTop: "none" }}>fatherName</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>Mother Name</td>
                                <td style={{ borderTop: "none" }}>motherName</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>Father Alive</td>
                                <td style={{ borderTop: "none" }}>fatherAlive</td>
                              </tr>
                             
                              <tr>
                                <td style={{ borderTop: "none" }}>Mother Alive</td>
                                <td style={{ borderTop: "none" }}>motherAlive</td>
                              </tr>
                             
                             
                            </tbody>
                          </table>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6">
                          <table
                            class="table  table-borderless"
                            style={{ border: "none" }}
                          >
                            <tbody>
                            <tr>
                                <td style={{ borderTop: "none" }}>Sibling Details</td>
                                <td style={{ borderTop: "none" }}>siblingDetails</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>Financial Status</td>
                                <td style={{ borderTop: "none" }}>financialStatus</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>Property Values</td>
                                <td style={{ borderTop: "none" }}>propertyValues</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>
                                Family Type
                                </td>
                                <td style={{ borderTop: "none" }}>familyType</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <h5
                        style={{
                          padding: "8px 15px",
                          backgroundColor: "#e7e5e5c0",
                          color: "red",
                        }}
                      >
                       Partner Details
                      </h5>
                      <div className="row"> 
                        <div className="col-sm-12 col-md-6 col-lg-6">
                          <table
                            class="table  table-borderless"
                            style={{ border: "none" }}
                          >
                            <tbody>
                            <tr>
                                <td style={{ borderTop: "none" }}>Age</td>
                                <td style={{ borderTop: "none" }}>age</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>Height</td>
                                <td style={{ borderTop: "none" }}>height</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>Dhosam</td>
                                <td style={{ borderTop: "none" }}>dhosam</td>
                              </tr>
                             
                              <tr>
                                <td style={{ borderTop: "none" }}>Rahu Ketu</td>
                                <td style={{ borderTop: "none" }}>rahuKetu</td>
                              </tr>
                             
                             
                            </tbody>
                          </table>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6">
                          <table
                            class="table  table-borderless"
                            style={{ border: "none" }}
                          >
                            <tbody>
                            <tr>
                                <td style={{ borderTop: "none" }}>Annual Income</td>
                                <td style={{ borderTop: "none" }}>annualIncome</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>Foreign Interest</td>
                                <td style={{ borderTop: "none" }}>foreignInterest</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>Marital Status</td>
                                <td style={{ borderTop: "none" }}>maritalStatus</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>
                                Status
                                </td>
                                <td style={{ borderTop: "none" }}>status</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <h5
                        style={{
                          padding: "8px 15px",
                          backgroundColor: "#e7e5e5c0",
                          color: "red",
                        }}
                      >
                      Personality Details
                      </h5>
                      <div className="row"> 
                        <div className="col-sm-12 col-md-6 col-lg-6">
                          <table
                            class="table  table-borderless"
                            style={{ border: "none" }}
                          >
                            <tbody>
                            <tr>
                                <td style={{ borderTop: "none" }}>Height</td>
                                <td style={{ borderTop: "none" }}>height</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>Weight</td>
                                <td style={{ borderTop: "none" }}>weight</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>Complexion</td>
                                <td style={{ borderTop: "none" }}>complexion</td>
                              </tr>
                             
                              <tr>
                                <td style={{ borderTop: "none" }}>Blood Group</td>
                                <td style={{ borderTop: "none" }}>bloodGroup</td>
                              </tr>
                             
                             
                            </tbody>
                          </table>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6">
                          <table
                            class="table  table-borderless"
                            style={{ border: "none" }}
                          >
                            <tbody>
                            <tr>
                                <td style={{ borderTop: "none" }}>Body Type</td>
                                <td style={{ borderTop: "none" }}>bodyType</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>Physical Status</td>
                                <td style={{ borderTop: "none" }}>physicalStatus</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>Eye Wear</td>
                                <td style={{ borderTop: "none" }}>eyeWear</td>
                              </tr>
                              <tr>
                                <td style={{ borderTop: "none" }}>
                                About MySelf
                                </td>
                                <td style={{ borderTop: "none" }}>aboutMySelf</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </Col>
           )) : <h3>No Profile Data Found</h3>} 
        </Row>
    </div>
  );
};

export default UserfullDetails;
