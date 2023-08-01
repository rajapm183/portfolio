import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import api from "../Axios";
import moment from "moment";
import Datatable from "react-bs-datatable";

const CustomerDetails = () => {
  const params = useParams();
  const customerId = params.id;
  const [data, setData] = useState();
  const [table, setTable] = useState();
  const [nouser, setNouser] = useState([]);
  const header = [
    { title: "ID", prop: "id", sortable: true, filterable: true },
    {
      title: "Address Type",
      prop: "addressType",
      sortable: true,
      filterable: true,
    },
    { title: "Street", prop: "street", sortable: true, filterable: true },
    { title: "City", prop: "city", sortable: true, filterable: true },
    { title: "Landmark", prop: "landmark", sortable: true, filterable: true },
    { title: "Pincode", prop: "zipcode", sortable: true, filterable: true },
    { title: "District", prop: "district", sortable: true, filterable: true },
    { title: "State", prop: "state", sortable: true, filterable: true },
    { title: "Primary", prop: "primary", sortable: true, filterable: true },
  ];
  const customLabels = {
    first: "<<",
    last: ">>",
    prev: "<",
    next: ">",
    show: "Display ",
    entries: " rows",
    // noResults: "There is no data to be displayed",
  };

  useEffect(() => {
    api
      .post("/admin/shop/singleCustomer/", { customerId })
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
        if (res.data.data.fetchedAddress != "No Address Found") {
          setTable(
            res.data.data.fetchedAddress.map((info) => ({
              ...info,
              addressType: (
                <span style={{ textTransform: "capitalize" }}>
                  {info.addressType}
                </span>
              ),
              street: (
                <span style={{ textTransform: "capitalize" }}>
                  {info.street}
                </span>
              ),
              city: (
                <span style={{ textTransform: "capitalize" }}>{info.city}</span>
              ),
              landmark: (
                <span style={{ textTransform: "capitalize" }}>
                  {info.landmark}
                </span>
              ),
              district: (
                <span style={{ textTransform: "capitalize" }}>
                  {info.district}
                </span>
              ),
              state: (
                <span style={{ textTransform: "capitalize" }}>
                  {info.state}
                </span>
              ),
              primary: (
                <span style={{ textTransform: "capitalize" }}>
                  {info.primary}
                </span>
              ),
            }))
          );
        } else {
          setNouser(res.data.data.fetchedAddress);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log("data", data);

  function checkArray(data) {
    if (Array.isArray(data)) return data;
    else if (typeof data === "object") return [data];
    else return [];
  }

  return (
    <div>
      <div className="content">
        <Row>
          <Col xs={12} md={12}>
            <div className="page-title">
              <div className="float-left">
                <h1 className="title">Customer Profile</h1>
              </div>
            </div>

            <div className="col-xl-12">
              <section className="box profile-page">
                <div className="content-body">
                  <div className="col-12">
                    <div className="row uprofile">
                      {checkArray(data).map((info) => (
                        <>
                          <div className="uprofile-image col-xl-2 col-lg-3 col-md-3 col-sm-4 col-12">
                            <img
                              alt=""
                              src={"https://api.bioforhealth.in" + info.fetched.profilePic}
                              className="img-fluid"
                            />
                          </div>
                          <div className="uprofile-name col-xl-10 col-lg-9 col-md-9 col-sm-8 col-12">
                            <h3 className="uprofile-owner">
                              <a href="#!">{info.fetched.userName}</a>
                            </h3>

                            <div className="clearfix"></div>
                            <p
                              style={{
                                color: "#aaaaaa",
                                display: "inline-block",
                              }}
                            >
                              {info.fetched.alaisName}
                            </p>
                            <div className="clearfix"></div>

                            <div className="row">
                              <div className="col-lg-4 col-md-5 col-sm-6">
                                <p>
                                  <i className="i-screen-smartphone"></i>{" "}
                                  {info.fetched.phone}
                                </p>
                                <p>
                                  <i className="fa fa-envelope-o"></i>{" "}
                                  {info.fetched.email}
                                </p>
                                <p style={{ textTransform: "capitalize" }}>
                                  <i className="fa fa-venus-mars"></i>{" "}
                                  {info.fetched.gender}
                                </p>
                              </div>

                              <div className="col-lg-4 col-md-5 col-sm-6">
                                <p>
                                  <i className="fa fa-birthday-cake"></i>{" "}
                                  {moment(info.fetched.dob).format("LL")}
                                </p>
                                <p>
                                  <i className="i-calendar"></i>{" "}
                                  {moment(info.fetched.createdAt).format(
                                    "MMM D ddd Y"
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
            {/*------------------ ADDRESS LIST ----------------------- */}
            <div className="col-12">
              <section className="box ">
                {nouser == "No Address Found" ? (
                  <>
                    {" "}
                    <div
                      class="alert alert-warning alert-dismissible fade show text-center"
                      role="alert"
                    >
                      <strong>No Address found for this User!</strong>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <header className="panel_header">
                      <h2 className="title float-left">Address</h2>
                    </header>
                    <div className="content-body">
                      <div className="row">
                        <div className="col-lg-12 dt-disp">
                          <Datatable
                            tableHeader={header}
                            tableBody={table}
                            keyName="userTable"
                            tableClass="striped table-hover table-responsive"
                            rowsPerPage={10}
                            rowsPerPageOption={[5, 10, 15, 20, 30]}
                            initialSort={{ prop: "id", isAscending: true }}
                            // onSort={onSortFunction}
                            labels={customLabels}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </section>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CustomerDetails;
