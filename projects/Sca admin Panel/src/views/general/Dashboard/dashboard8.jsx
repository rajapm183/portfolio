import React, { useEffect, useState, useRef } from "react";
import { Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import api, { baseURL } from "../../../Axios";

const dashboard8 = () => {
  const notiRef = useRef();
  const [userdetails, setUserdetails] = useState("");
  const [familydetails, setFamilyDetails] = useState("");
  const [horoscopedetails, setHoroscopeDetails] = useState("");
  const [partnerdetails, setPartnerDetails] = useState("");
  const [profile, setProfile] = useState("");
  const [change, setChange] = useState(false);
  const [educhange, setEduchange] = useState(false);
  const [salarychange,setSalaryChange] = useState(false)
  const [selfiechange,setSelfieChange] = useState(false)
  const [personalitydetails, setPersonalityDetails] = useState("");
  const [userdocumentdetails,setUserdocumentDetails] = useState("")
  const [salaryverify,setSalaryVerify] = useState("")
  // const [data, setData] = useState([]);
  // const [render, setRerender] = useState(false);
  const { id } = useParams();
  const [active, setActive] = useState(false);

 
  useEffect(() => {
    api.post("/admin/adminDashboard/userFullDetails", { id:parseInt(id)}).then((res) => {
      setUserdetails(res.data.data.userDetails);
      setFamilyDetails(res.data.data.familyDetails);
      setHoroscopeDetails(res.data.data.horoscopeDetails);
      setPartnerDetails(res.data.data.partnerDetails);
      setProfile(res.data.data.profile);
      setPersonalityDetails(res.data.data.personalityDetails);
      setUserdocumentDetails(res.data.data.userDocumentDetails);
    });
  }, []);
  function verify(id) {
    api.post("/admin/adminDashboard/imageVerified", { id }).then((res) => {
      setChange(!change);
      api.post("/admin/adminDashboard/userFullDetails", { id }).then((res) => {
        setUserdetails(res.data.data.userDetails);
        setFamilyDetails(res.data.data.familyDetails);
        setHoroscopeDetails(res.data.data.horoscopeDetails);
        setPartnerDetails(res.data.data.partnerDetails);
        setProfile(res.data.data.profile);
        setPersonalityDetails(res.data.data.personalityDetails);
        setUserdocumentDetails(res.data.data.userDocumentDetails);
        
      });
    });
  }
  function verifieds(id) {
    api.post("/admin/adminDashboard/educationDetailsVerified", { id }).then((res) => {
      setEduchange(!educhange);
      api.post("/admin/adminDashboard/userFullDetails", { id }).then((res) => {
        setUserdetails(res.data.data.userDetails);
        setFamilyDetails(res.data.data.familyDetails);
        setHoroscopeDetails(res.data.data.horoscopeDetails);
        setPartnerDetails(res.data.data.partnerDetails);
        setProfile(res.data.data.profile);
        setPersonalityDetails(res.data.data.personalityDetails);
        setUserdocumentDetails(res.data.data.userDocumentDetails);
      });
    });
  }
  function salaryVerifys(id) {
    api.post("/admin/adminDashboard/salaryVerified", { id }).then((res) => {
      setSalaryChange(!salarychange);
      api.post("/admin/adminDashboard/userFullDetails", { id }).then((res) => {
        setUserdetails(res.data.data.userDetails);
        setFamilyDetails(res.data.data.familyDetails);
        setHoroscopeDetails(res.data.data.horoscopeDetails);
        setPartnerDetails(res.data.data.partnerDetails);
        setProfile(res.data.data.profile);
        setPersonalityDetails(res.data.data.personalityDetails);
        setUserdocumentDetails(res.data.data.userDocumentDetails);
        console.log(res.data.data.salaryverify);
      });
    });
  }
  function selfieVerify(id) {
    api.post("/admin/adminDashboard/selfieVerified", { id }).then((res) => {
      setSelfieChange(!selfiechange);
      api.post("/admin/adminDashboard/userFullDetails", { id }).then((res) => {
        setUserdetails(res.data.data.userDetails);
        setFamilyDetails(res.data.data.familyDetails);
        setHoroscopeDetails(res.data.data.horoscopeDetails);
        setPartnerDetails(res.data.data.partnerDetails);
        setProfile(res.data.data.profile);
        setPersonalityDetails(res.data.data.personalityDetails);
        setUserdocumentDetails(res.data.data.userDocumentDetails);
        console.log(res.data.data.salaryverify);
      });
    });
  }
  function activee(id) {
    api.post("/admin/manageuserProfile/deleteUser", { id }).then(() => {
      setActive(!active);
      api.post("/admin/adminDashboard/userFullDetails", { id }).then((res) => {
        setUserdetails(res.data.data.userDetails);
        setFamilyDetails(res.data.data.familyDetails);
        setHoroscopeDetails(res.data.data.horoscopeDetails);
        setPartnerDetails(res.data.data.partnerDetails);
        setProfile(res.data.data.profile);
        setPersonalityDetails(res.data.data.personalityDetails);
        setUserdocumentDetails(res.data.data.userDocumentDetails);
      });
    });
  }
  function deletee(id) {
    api.post("/admin/manageuserProfile/terminateUser", { id }).then(() => {
      api.post("/admin/adminDashboard/userFullDetails", { id });
    });
  }
  return (
    <div className="col-12">
      <Row>
        <Col xs={12} md={12}>
          <div className="page-title">
            <div className="float-left">
              <h1 className="title">Members Full Profile</h1>
            </div>
          </div>
          <div className="col-12">
            <section className="box ">
              <header
                className="panel_header"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 2rem",
                  }}
                >
                  <h2
                    style={{ textTransform: "capitalize", marginRight: "2px" }}
                  >
                    {profile ? profile.userName : "Name"}
                  </h2>
                  <span
                    className="badge"
                    style={{
                      borderRadius: "10px",
                      fontWeight: "500",
                      backgroundColor: "black",
                    }}
                  >
                    {profile.profileId}
                  </span>
                </div>
                <div style={{ marginTop: "50px" }}>
                  <a href="/dashboard">
                    <button
                      onClick={() => deletee(profile.id)}
                      style={{
                        backgroundColor: "#eb3143",
                        color: "white",
                        border: "none",
                        fontSize: "14px",
                        padding: "2px 10px",
                        marginRight: "20px",
                        fontWeight: "500",
                      }}
                    >
                      Delete
                    </button>
                  </a>
                  <button
                    onClick={() => activee(profile.id)}
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      border: "none",
                      fontSize: "14px",
                      padding: "2px 10px",
                      marginRight: "20px",
                      fontWeight: "500",
                    }}
                  >
                    {profile.status == "active" ? "Active" : "Inactive"}
                  </button>
                </div>
              </header>
              <div className="content-body">
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                    <img
                      src={baseURL + profile.images}
                      style={{ width: "500px", height: "400px" }}
                    />
                    <div className="mt-5">
                      <hr />
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <h5>
                          Image Verification Status:
                          <span
                            className="badge"
                            style={{
                              borderRadius: "10px",
                              fontWeight: "500",
                              backgroundColor: "black",
                            }}
                          >
                            {profile.imageVerified == "0"
                              ? "Not Verified"
                              : "Verified"}
                          </span>{" "}
                        </h5>
                        <h5>
                          <span>
                            <button
                              className="btn "
                              onClick={() => verify(profile.id)}
                              style={{
                                background:
                                  profile.imageVerified == "0"
                                    ? "green"
                                    : "orange",
                                color: "white",
                                padding: "5px 8px",
                                fontSize: "14px",
                                fontWeight: "500",
                              }}
                            >
                              {profile.imageVerified == "0"
                                ? "Verify"
                                : "Unverify"}
                            </button>
                          </span>
                        </h5>
                      </div>
                      {userdocumentdetails === "User document details not completed" ? (null) :(<div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <h5>
                          Salary Verification Status:
                          <span
                            className="badge"
                            style={{
                              borderRadius: "10px",
                              fontWeight: "500",
                              backgroundColor: "black",
                            }}
                          >
                            {userdocumentdetails.salarySlipVerified == "0" 
                              ? "Not Verified"
                              : "Verified"}
                          </span>{" "}
                        </h5>
                        <h5>
                          <span>
                            <button
                              className="btn "
                              onClick={() => salaryVerifys(profile.id)}
                              style={{
                                background:
                                userdocumentdetails.salarySlipVerified == "0"
                                    ? "green"
                                    : "orange",
                                color: "white",
                                padding: "5px 8px",
                                fontSize: "14px",
                                fontWeight: "500",
                              }}
                            >
                              {userdocumentdetails.salarySlipVerified == "0"
                                ? "Verify"
                                : "Unverify"}
                            </button>
                          </span>
                        </h5>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <h5>
                          Selfie Verification Status:
                          <span
                            className="badge"
                            style={{
                              borderRadius: "10px",
                              fontWeight: "500",
                              backgroundColor: "black",
                            }}
                          >
                            {userdocumentdetails.selfiePicVerified == "0"
                              ? "Not Verified"
                              : "Verified"}
                          </span>{" "}
                        </h5>
                        <h5>
                          <span>
                            <button
                              className="btn "
                              onClick={() => selfieVerify(profile.id)}
                              style={{
                                background:
                                userdocumentdetails.selfiePicVerified == "0"
                                    ? "green"
                                    : "orange",
                                color: "white",
                                padding: "5px 8px",
                                fontSize: "14px",
                                fontWeight: "500",
                              }}
                            >
                              {userdocumentdetails.selfiePicVerified == "0"
                                ? "Verify"
                                : "Unverify"}
                            </button>
                          </span>
                        </h5>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <h5>
                          Education Verification Status:
                          <span
                            className="badge"
                            style={{
                              borderRadius: "10px",
                              fontWeight: "500",
                              backgroundColor: "black",
                            }}
                          >
                            {userdocumentdetails.educationDetailsVerified == "0"
                              ? "Not Verified"
                              : "Verified"}
                          </span>
                        </h5>
                        <h5>
                          <span>
                            <button
                              className="btn"
                              onClick={() => verifieds(profile.id)}
                              style={{
                                background:
                                userdocumentdetails.educationDetailsVerified == "0"
                                    ? "green"
                                    : "orange",
                                color: "white",
                                padding: "5px 8px",
                                fontSize: "14px",
                                fontWeight: "500",
                              }}
                            >
                              {userdocumentdetails.educationDetailsVerified == "0"
                                ? "Verify"
                                : "Unverify"}
                            </button>
                          </span>
                        </h5>
                      </div>
                      </div>
                    )}
                      <hr />
                      <div>
                        
                        <h4>What we are looking for: </h4>
                        <h5 style={{ textAlign: "justify" }}>
                          {userdetails ? userdetails.weLookingFor : "none"}
                        </h5>
                      </div>
                    </div>
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
                      <div className="col-sm-12 col-md-12 col-lg-6">
                        <table
                          className="table  table-borderless"
                          style={{ border: "none" }}
                        >
                          <tbody>
                            <tr>
                              <td style={{ borderTop: "none" }}>Username</td>
                              <td
                                style={{
                                  borderTop: "none",
                                  paddingLeft: "100px",
                                }}
                              >
                                {profile.userName}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ borderTop: "none" }}>
                                Date of Birth
                              </td>
                              <td
                                style={{
                                  borderTop: "none",
                                  paddingLeft: "100px",
                                }}
                              >
                                {profile.dob}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ borderTop: "none" }}>Age</td>
                              <td
                                style={{
                                  borderTop: "none",
                                  paddingLeft: "100px",
                                }}
                              >
                                {profile.age}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ borderTop: "none" }}>Ph. No</td>
                              <td
                                style={{
                                  borderTop: "none",
                                  paddingLeft: "100px",
                                }}
                              >
                                {profile.phone}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ borderTop: "none" }}>Gender</td>
                              <td
                                style={{
                                  borderTop: "none",
                                  paddingLeft: "100px",
                                }}
                              >
                                {profile.gender}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ borderTop: "none" }}>Email</td>
                              <td
                                style={{
                                  borderTop: "none",
                                  paddingLeft: "100px",
                                }}
                              >
                                {profile.email}
                              </td>
                            </tr>
                            {/* {profile.membershipId && (
                              <tr>
                                <td style={{ borderTop: "none" }}>
                                  Membership Id
                                </td>
                                <td
                                  style={{
                                    borderTop: "none",
                                    paddingLeft: "100px",
                                  }}
                                >
                                  {" "}
                                  {profile.membershipId
                                    ? profile.membershipId
                                    : false}
                                </td>
                              </tr>
                            )} */}
                          </tbody>
                        </table>
                      </div>
                      <div className="col-sm-12 col-md-12 col-lg-6">
                        <table
                          className="table  table-borderless"
                          style={{ border: "none" }}
                        >
                          <tbody>
                            <tr>
                              <td style={{ borderTop: "none" }}>Country</td>
                              <td style={{ borderTop: "none" }}>
                                {" "}
                                {profile.country}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ borderTop: "none" }}>State</td>
                              <td style={{ borderTop: "none" }}>
                                {" "}
                                {profile.state}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ borderTop: "none" }}>City</td>
                              <td style={{ borderTop: "none" }}>
                                {" "}
                                {profile.city}
                              </td>
                            </tr>

                            <tr>
                              <td style={{ borderTop: "none" }}>
                                Profile Type
                              </td>
                              <td style={{ borderTop: "none" }}>
                                {" "}
                                {profile.profileType}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ borderTop: "none" }}>
                                Membership Type
                              </td>
                              <td style={{ borderTop: "none" }}>
                                {" "}
                                {profile.membershipType}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ borderTop: "none" }}>
                                Payment Status
                              </td>
                              <td style={{ borderTop: "none" }}>
                                {" "}
                                {profile.paymentStatus}
                              </td>
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
                    {userdetails === "User details not found" ? 
                    <div style={{textAlign:"center" ,color:"black", fontWeight:"bold"}}>User Details Not Found</div>:(
                     <div>
                       {userdetails.maritalStatus === "neverMarried" ? (
                        <div className="row" style={{display:"flex"}}>
                          <div className="col-sm-12 col-md-12 col-lg-6">
                            <table
                              className="table  table-borderless"
                              style={{ border: "none" }}
                            >
                              <tbody>
                                <tr>
                                  <td style={{ borderTop: "none" }}>
                                    Marital Status
                                  </td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails
                                      ? userdetails.maritalStatus
                                      : "none"}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ borderTop: "none" }}>
                                    ProfileCreatedBy
                                  </td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails
                                      ? userdetails.profileCreatedBy
                                      : "none"}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ borderTop: "none" }}>
                                    Educational Qualification
                                  </td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails
                                      ? userdetails.educationalQualification
                                      : "none"}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ borderTop: "none" }}>
                                    Religion
                                  </td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails
                                      ? userdetails.religion
                                      : "none"}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ borderTop: "none" }}>
                                    Mother Tongue
                                  </td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails
                                      ? userdetails.motherTongue
                                      : "none"}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ borderTop: "none" }}>Caste</td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails ? userdetails.caste : "none"}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ borderTop: "none" }}>
                                    Sub Caste
                                  </td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails
                                      ? userdetails.subCaste
                                      : "none"}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="col-sm-12 col-md-12 col-lg-6">
                            <table
                              className="table  table-borderless"
                              style={{ border: "none" }}
                            >
                              <tbody>
                              <tr>
                                  <td style={{ borderTop: "none" }}>
                                    Refered By
                                  </td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails
                                      ? userdetails.referedBy
                                      : "none"}
                                  </td>
                                </tr>
                              <tr>
                                  <td style={{ borderTop: "none" }}>
                                    Willing To Marry
                                  </td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails
                                      ? userdetails.willingToMarry
                                      : "none"}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ borderTop: "none" }}>
                                    Profession
                                  </td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails
                                      ? userdetails.profession
                                      : "none"}
                                  </td>
                                </tr>

                                <tr>
                                  <td style={{ borderTop: "none" }}>
                                    Profession Designation
                                  </td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails
                                      ? userdetails.professionDesignation
                                      : "none"}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ borderTop: "none" }}>
                                    Profession Description
                                  </td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails
                                      ? userdetails.professionDesc
                                      : "none"}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ borderTop: "none" }}>
                                    Profession Location
                                  </td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails
                                      ? userdetails.professionLocation
                                      : "none"}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ borderTop: "none" }}>
                                    Annual Income
                                  </td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails
                                      ? userdetails.annualIncome
                                      : "none"}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) 
                      :
                       (
                        <div className="Row" style={{display:"flex"}}>
                          <div className="col-sm-12 col-md-12 col-lg-6">
                            <table
                              className="table  table-borderless"
                              style={{ border: "none" }}
                            >
                              <tbody>
                                <tr>
                                  <td style={{ borderTop: "none" }}>
                                    Marital Status
                                  </td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails
                                      ? userdetails.maritalStatus
                                      : "none"}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ borderTop: "none" }}>
                                    ProfileCreatedBy
                                  </td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails
                                      ? userdetails.profileCreatedBy
                                      : "none"}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ borderTop: "none" }}>
                                    Refered By
                                  </td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails
                                      ? userdetails.referedBy
                                      : "none"}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ borderTop: "none" }}>
                                    Educational Qualification
                                  </td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails
                                      ? userdetails.educationalQualification
                                      : "none"}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ borderTop: "none" }}>
                                    Religion
                                  </td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails
                                      ? userdetails.religion
                                      : "none"}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ borderTop: "none" }}>
                                    Mother Tongue
                                  </td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails
                                      ? userdetails.motherTongue
                                      : "none"}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ borderTop: "none" }}>Caste</td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails ? userdetails.caste : "none"}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ borderTop: "none" }}>
                                    Sub Caste
                                  </td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails
                                      ? userdetails.subCaste
                                      : "none"}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="col-sm-12 col-md-12 col-lg-6">
                            <table
                              className="table  table-borderless"
                              style={{ border: "none" }}
                            >
                              <tbody>
                              
                                <tr>
                                  <td style={{ borderTop: "none" }}>
                                    Willing To Marry
                                  </td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails
                                      ? userdetails.willingToMarry
                                      : "none"}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ borderTop: "none" }}>
                                    Profession
                                  </td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails
                                      ? userdetails.profession
                                      : "none"}
                                  </td>
                                </tr>

                                <tr>
                                  <td style={{ borderTop: "none" }}>
                                    Profession Designation
                                  </td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails
                                      ? userdetails.professionDesignation
                                      : "none"}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ borderTop: "none" }}>
                                    Profession Description
                                  </td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails
                                      ? userdetails.professionDesc
                                      : "none"}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ borderTop: "none" }}>
                                    Profession Location
                                  </td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails
                                      ? userdetails.professionLocation
                                      : "none"}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ borderTop: "none" }}>
                                    Annual Income
                                  </td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails
                                      ? userdetails.annualIncome
                                      : "none"}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ borderTop: "none" }}>
                                    Number Of Children
                                  </td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails
                                      ? userdetails.numberOfChildren
                                      : "none"}
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ borderTop: "none" }}>
                                    Children Staying With Me
                                  </td>
                                  <td style={{ borderTop: "none" }}>
                                    {userdetails
                                      ? userdetails.childrenStayingWithMe
                                      : "none"}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                     </div>
                      )}
                    
                    <h5
                      style={{
                        padding: "8px 15px",
                        backgroundColor: "#e7e5e5c0",
                        color: "red",
                      }}
                    >
                      Family Details
                    </h5>
                    {familydetails ===  "Family details not found" ? 
                     <div style={{textAlign:"center" ,color:"black", fontWeight:"bold"}}>Family Details Not Found</div>:(
                    <div className="row">
                      <div className="col-sm-12 col-md-12 col-lg-6">
                        <table
                          className="table  table-borderless"
                          style={{ border: "none" }}
                        >
                          <tbody>
                            <tr>
                              <td style={{ borderTop: "none" }}>Father Name</td>
                              <td style={{ borderTop: "none" }}>
                                {familydetails
                                  ? familydetails.fatherName
                                  : "none"}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ borderTop: "none" }}>Mother Name</td>
                              <td style={{ borderTop: "none" }}>
                                {familydetails
                                  ? familydetails.motherName
                                  : "none"}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ borderTop: "none" }}>
                                Father Occupation
                              </td>
                              <td style={{ borderTop: "none" }}>
                                {familydetails
                                  ? familydetails.fatherOccupation
                                  : "none"}
                              </td>
                            </tr>

                            <tr>
                              <td style={{ borderTop: "none" }}>
                                Mother Occupation
                              </td>
                              <td style={{ borderTop: "none" }}>
                                {familydetails
                                  ? familydetails.motherOccupation
                                  : "none"}
                              </td>
                            </tr>

                            <tr>
                              <td style={{ borderTop: "none" }}>
                                Have Siblings
                              </td>
                              <td style={{ borderTop: "none" }}>
                                {familydetails
                                  ? familydetails.havingSiblings
                                  : "none"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-sm-12 col-md-12 col-lg-6">
                        <table
                          className="table  table-borderless"
                          style={{ border: "none" }}
                        >
                          <tbody>
                          <tr>
                              <td style={{ borderTop: "none" }}>
                              Number Of Siblings
                              </td>
                              <td style={{ borderTop: "none" }}>
                                {familydetails
                                  ? familydetails.noOfSiblings
                                  : "none"}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ borderTop: "none" }}>
                                Financial Status
                              </td>
                              <td style={{ borderTop: "none" }}>
                                {familydetails
                                  ? familydetails.financialStatus
                                  : "none"}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ borderTop: "none" }}>
                                Family Values
                              </td>
                              <td style={{ borderTop: "none" }}>
                                {familydetails
                                  ? familydetails.familyValues
                                  : "none"}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ borderTop: "none" }}>Family Type</td>
                              <td style={{ borderTop: "none" }}>
                                {familydetails
                                  ? familydetails.familyType
                                  : "none"}
                              </td>
                            </tr>
                            {familydetails.fatherAlive === null ? null : (
                              <tr>
                                <td style={{ borderTop: "none" }}>
                                  Father Alive
                                </td>
                                <td style={{ borderTop: "none" }}>
                                  {familydetails
                                    ? familydetails.fatherAlive
                                    : "none"}
                                </td>
                              </tr>
                            )}
                            {familydetails.motherAlive === null ? null : (
                              <tr>
                                <td style={{ borderTop: "none" }}>
                                  Mother Alive
                                </td>
                                <td style={{ borderTop: "none" }}>
                                  {familydetails
                                    ? familydetails.motherAlive
                                    : "none"}
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                      )}
                    <h5
                      style={{
                        padding: "8px 15px",
                        backgroundColor: "#e7e5e5c0",
                        color: "red",
                      }}
                    >
                      Partner Preference
                    </h5>
                    {partnerdetails ===  "Partner details not found" ? 
                     <div style={{textAlign:"center" ,color:"black", fontWeight:"bold"}}>Partner details not found</div>:(
                    <div className="row">
                      <div className="col-sm-12 col-md-12 col-lg-6">
                        <table
                          className="table  table-borderless"
                          style={{ border: "none" }}
                        >
                          <tbody>
                            <tr>
                              <td style={{ borderTop: "none" }}>Age</td>
                              <td style={{ borderTop: "none" }}>
                                {partnerdetails ? partnerdetails.age : "none"}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ borderTop: "none" }}>Height</td>
                              <td style={{ borderTop: "none" }}>
                                {partnerdetails
                                  ? partnerdetails.height
                                  : "none"}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ borderTop: "none" }}>Dhosam</td>
                              <td style={{ borderTop: "none" }}>
                                {partnerdetails
                                  ? partnerdetails.dhosam
                                  : "none"}
                              </td>
                            </tr>

                            <tr>
                              <td style={{ borderTop: "none" }}>Rahu Ketu</td>
                              <td style={{ borderTop: "none" }}>
                                {partnerdetails
                                  ? partnerdetails.rahuKetu
                                  : "none"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-sm-12 col-md-12 col-lg-6">
                        <table
                          className="table  table-borderless"
                          style={{ border: "none" }}
                        >
                          <tbody>
                            <tr>
                              <td style={{ borderTop: "none" }}>
                                Annual Income
                              </td>
                              <td style={{ borderTop: "none" }}>
                                {partnerdetails
                                  ? partnerdetails.annualIncome
                                  : "none"}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ borderTop: "none" }}>
                                Foreign Interest
                              </td>
                              <td style={{ borderTop: "none" }}>
                                {partnerdetails
                                  ? partnerdetails.foreignInterest
                                  : "none"}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ borderTop: "none" }}>Status</td>
                              <td style={{ borderTop: "none" }}>
                                {partnerdetails
                                  ? partnerdetails.status
                                  : "none"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                     )}
                    <h5
                      style={{
                        padding: "8px 15px",
                        backgroundColor: "#e7e5e5c0",
                        color: "red",
                      }}
                    >
                      Personality Details
                    </h5>
                    {personalitydetails ===  "Personality details not found" ? 
                     <div style={{textAlign:"center" ,color:"black", fontWeight:"bold"}}>Personality details not found</div>:(
                    <div className="row">
                      <div className="col-sm-12 col-md-12 col-lg-6">
                        <table
                          className="table  table-borderless"
                          style={{ border: "none" }}
                        >
                          <tbody>
                            <tr>
                              <td style={{ borderTop: "none" }}>Height</td>
                              <td style={{ borderTop: "none" }}>
                                {personalitydetails
                                  ? personalitydetails.height
                                  : "none"}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ borderTop: "none" }}>Weight</td>
                              <td style={{ borderTop: "none" }}>
                                {personalitydetails
                                  ? personalitydetails.weight
                                  : "none"}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ borderTop: "none" }}>Complexion</td>
                              <td style={{ borderTop: "none" }}>
                                {personalitydetails
                                  ? personalitydetails.complexion
                                  : "none"}
                              </td>
                            </tr>

                            <tr>
                              <td style={{ borderTop: "none" }}>Blood Group</td>
                              <td style={{ borderTop: "none" }}>
                                {personalitydetails
                                  ? personalitydetails.bloodGroup
                                  : "none"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-sm-12 col-md-12 col-lg-6">
                        <table
                          className="table  table-borderless"
                          style={{ border: "none" }}
                        >
                          <tbody>
                            <tr>
                              <td style={{ borderTop: "none" }}>Body Type</td>
                              <td style={{ borderTop: "none" }}>
                                {personalitydetails
                                  ? personalitydetails.bodyType
                                  : "none"}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ borderTop: "none" }}>
                                Physical Status
                              </td>
                              <td style={{ borderTop: "none" }}>
                                {personalitydetails
                                  ? personalitydetails.physicalStatus
                                  : "none"}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ borderTop: "none" }}>Eye Wear</td>
                              <td style={{ borderTop: "none" }}>
                                {personalitydetails
                                  ? personalitydetails.eyeWear
                                  : "none"}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ borderTop: "none" }}>
                                About MySelf
                              </td>
                              <td style={{ borderTop: "none" }}>
                                {personalitydetails
                                  ? personalitydetails.aboutMySelf
                                  : "none"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                     )}
                    <h5
                      style={{
                        padding: "8px 15px",
                        backgroundColor: "#e7e5e5c0",
                        color: "red",
                      }}
                    >
                      Horoscope Detials
                    </h5>
                    {horoscopedetails ===  "Horoscope details not completed" ? 
                     <div style={{textAlign:"center" ,color:"black", fontWeight:"bold"}}>Horoscope details not found</div>:(
                    <div className="row" style={{display:"flex"}}>
                      <div className="col-sm-12 col-md-12 col-lg-6">
                        <table
                         className="table  table-borderless"
                         style={{ border: "none" }}
                        >
                          <tbody>
                            <tr>
                              <td>Time Of Birth</td>
                              <td>
                              {horoscopedetails ? horoscopedetails.timeOfBirth : "none"}
                              </td>
                            </tr>
                            <tr>
                              <td>Date Of Birth</td>
                              <td>
                              {horoscopedetails ? horoscopedetails.dateOfBirth : "none"}
                              </td>
                            </tr>
                            <tr>
                              <td>Place Of Birth</td>
                              <td>
                              {horoscopedetails ? horoscopedetails.placeOfBirth : "none"}
                              </td>
                            </tr>
                            <tr>
                              <td>Zodiac Sign</td>
                              <td>
                              {horoscopedetails ? horoscopedetails.zodiacSign : "none"}
                              </td>
                            </tr>
                            <tr>
                              <td>Zodiac Star</td>
                              <td>
                              {horoscopedetails ? horoscopedetails.zodiacStar : "none"}
                              </td>
                            </tr>

                          </tbody>

                        </table>

                      </div>
                      <div className="col-sm-12 col-md-12 col-lg-6">
                        <table
                         className="table  table-borderless"
                         style={{ border: "none" }}
                        >
                          <tbody>
                          <tr>
                              <td>Gothram</td>
                              <td>
                              {horoscopedetails ? horoscopedetails.gothram : "none"}
                              </td>
                            </tr>
                            <tr>
                              <td>Padham</td>
                              <td>
                              {horoscopedetails ? horoscopedetails.padham : "none"}
                              </td>
                            </tr>
                            <tr>
                              <td>Select Lagnam</td>
                              <td>
                              {horoscopedetails ? horoscopedetails.selectLagnam : "none"}
                              </td>
                            </tr>
                            <tr>
                              <td>Madhulam</td>
                              <td>
                              {horoscopedetails ? horoscopedetails.madhulam : "none"}
                              </td>
                            </tr>
                            
                          </tbody>

                        </table>
                      

                      </div>
                    </div>
                      )}

                  </div>
                    
                </div>
              </div>
            </section>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default dashboard8;
