import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Button } from "reactstrap";
import moment from "moment";
import Datatable from "react-bs-datatable";
import api from "../Axios";
import NotificationAlert from "react-notification-alert";

const CustomerList = () => {
  const notiRef = useRef();
  const header = [
    { title: "ID", prop: "id", sortable: true, filterable: true },
    {
      title: "Profile Picture",
      prop: "profilePic",
      sortable: true,
      filterable: true,
    },
    { title: "Name", prop: "userName", sortable: true, filterable: true },
    { title: "Phone", prop: "phone", sortable: true, filterable: true },
    { title: "Gender", prop: "gender", sortable: true, filterable: true },
    { title: "Email", prop: "email", sortable: true, filterable: true },
    { title: "Status", prop: "status", sortable: true, filterable: true },
    { title: "Action", prop: "action", sortable: true, filterable: true },
  ];

  // const header = [
  //   { title: "ID", prop: "id", sortable: true, filterable: true },
  //   { title: "Name", prop: "name", sortable: true, filterable: true },
  //   { title: "Company", prop: "company", sortable: true, filterable: true },
  //   { title: "Email", prop: "email", sortable: true, filterable: true },
  //   { title: "Phone", prop: "phone", sortable: true, filterable: true },
  //   { title: "Date", prop: "date", sortable: true, filterable: true },
  // ];

  // const body = [
  //   {
  //     id: 1,
  //     name: "Helen Banks",
  //     nam: "Helen Banks",
  //     nae: "Helen Banks",
  //     gender: <b>Brainlounge</b>,
  //     email: "hbanks0@networkadvertising.org",
  //     phone: "386-(842)278-0044",
  //     date: moment().subtract(1, "days").format("Do MMMM YYYY"),
  //     ),
  //   },
  //
  // ];
  const customLabels = {
    first: "<<",
    last: ">>",
    prev: "<",
    next: ">",
    show: "Display ",
    entries: " rows",
    noResults: "No Users Found",
  };

  const [data, setData] = useState([]);
  const [nouser, setNouser] = useState([]);
  const [render, setRerender] = useState(false);
  // console.log('data', data);

  const check = (info, index) => {
    // console.log(info);
    api
      .post("/admin/shop/updateCustomer", {
        customerId: info.id,
        status: info.status == "active" ? "inactive" : "active",
      })
      .then((res) => {
        console.log(res);
        setRerender(!render);
        notify(res.data.data, "success");
      })
      .catch((err) => {
        console.log(err);
        notify(err, "danger");
      });
  };

  function notify(msg, type) {
    var type = type;
    var options = {};
    options = {
      place: "tc",
      message: (
        <div className="notification-msg">
          <div className="text-center">{msg}</div>
        </div>
      ),
      type: type,
      icon: "",
      autoDismiss: 3,
    };
    notiRef.current.notificationAlert(options);
  }

  useEffect(() => {
    const getCategory = () => {
      api
        .get("admin/shop/customer")
        .then((resp) => {
          console.log(resp.data.data);
          if (resp.data.data == "No Users Found") {
            setNouser(resp.data.data);
          } else {
            setData(
              resp.data.data.map((data, i) => ({
                ...data,
                userName: (
                  <span style={{ textTransform: "capitalize" }}>
                    {data.userName}
                  </span>
                ),
                gender: (
                  <span style={{ textTransform: "capitalize" }}>
                    {data.gender}
                  </span>
                ),
                status: (
                  <label className="toggle">
                    <input
                      type="checkbox"
                      onClick={() => check(data, i)}
                      checked={data.status == "active" ? true : false}
                    />
                    <span className="slider"></span>
                    <span
                      className="labels"
                      data-on="Active"
                      data-off="InActive"
                    ></span>
                  </label>
                ),
                action: (
                  <button
                    className="btn btn-secondary btn-icon bottom15 right15"
                    style={{ padding: "8px", paddingRight: "10px" }}
                    onClick={() =>
                      (window.location.href = "/customer-details/" + data.id)
                    }
                  >
                    <i className="fa fa-eye"></i> <span>View</span>
                  </button>
                ),
                profilePic: (
                  <img src={"https://api.bioforhealth.in" + data.profilePic} width={50} height={50} />
                ),
              }))
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log("resp", resp);
    };
    getCategory();
  }, [render]);
  console.log("data", data);
  return (
    <div>
      <div className="content">
        <div className="notification-popup">
          <NotificationAlert ref={notiRef} />
        </div>
        <Row>
          <Col xs={12} md={12}>
            <div className="page-title">
              <div className="float-left">
                <h1 className="title">Customer</h1>
              </div>
            </div>
            <div className="col-12">
              <section className="box ">
                {nouser == "No Users Found" ? (
                  <>
                    {" "}
                    <div
                      class="alert alert-warning alert-dismissible fade show text-center"
                      role="alert"
                    >
                      <strong>No Users Found!</strong>
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
                  ""
                )}

                <header className="panel_header">
                  <h2 className="title float-left">Customer Lists</h2>
                </header>

                <div className="content-body">
                  <div className="row">
                    <div className="col-lg-12 dt-disp">
                      <Datatable
                        tableHeader={header}
                        tableBody={data}
                        keyName="userTable"
                        tableClass="striped table-hover table-responsive"
                        rowsPerPage={10}
                        rowsPerPageOption={[5, 10, 15, 20, 30]}
                        initialSort={{ prop: "id", isAscending: true }}
                        //   onSort={onSortFunction}
                        labels={customLabels}
                      />
                    </div>
                    {data != [] ? "" : <p>No User Found</p>}
                  </div>
                </div>
              </section>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CustomerList;
