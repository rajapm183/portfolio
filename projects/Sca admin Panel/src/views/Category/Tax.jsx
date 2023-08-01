import React, { useState, useRef, useEffect } from "react";
import { Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import api from "../../Axios";
import NotificationAlert from "react-notification-alert";
import Datatable from "react-bs-datatable";
import moment from "moment";

const Tax = (props) => {
  const notiRef = useRef();
  const [render, setRender] = useState(false);
  const [data, setData] = useState({
    taxName: "",
    taxPercentage: null,
  });
  const [taxlist, setTaxlist] = useState();
  const header = [
    { title: "ID", prop: "id", sortable: true, filterable: true },
    {
      title: "Tax Name",
      prop: "taxName",
      sortable: true,
      filterable: true,
    },
    {
      title: "Tax Percentage",
      prop: "taxPercentage",
      sortable: true,
      filterable: true,
    },

    { title: "Created", prop: "createdAt", sortable: true, filterable: true },
    { title: "Updated", prop: "updatedAt", sortable: true, filterable: true },

    { title: "Action", prop: "action", sortable: true, filterable: true },
    // { title: "Phone", prop: "phone", sortable: true, filterable: true },
    // { title: "Date", prop: "date", sortable: true, filterable: true },
  ];
  const customLabels = {
    first: "<<",
    last: ">>",
    prev: "<",
    next: ">",
    show: "Display ",
    entries: " rows",
    noResults: "There is no data to be displayed",
  };

  function notify(msg, type) {
    // var color = Math.floor(Math.random() * 5 + 1);
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

  function delTax(id) {
    api
      .post("/admin/shop/removeTax", { taxId: id })
      .then((res) => {
        notify(res.data.data, "success");
        setRender(!render);
      })
      .catch((err) => {
        console.log(err);
        notify(err, "danger");
      });
  }

  useEffect(() => {
    function getTax() {
      api
        .post("/admin/shop/tax")
        .then((res) => {
          // console.log(res.data);
          if (res.data.data != "No Taxes found") {
            setTaxlist(
              res.data.data.map((info) => ({
                ...info,
                createdAt: moment(info.createdAt).fromNow(),
                updatedAt: moment(info.updatedAt).fromNow(),
                action: (
                  <button
                    className="btn btn-danger"
                    style={{ padding: "8px", paddingRight: "10px" }}
                    onClick={() => delTax(info.id)}
                  >
                    <i className="i-trash"></i> <span>Delete</span>
                  </button>
                ),
              }))
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getTax();
  }, [render]);

  function handleChange(e) {
    if (e.target.name === "taxPercentage")
      setData({ ...data, [e.target.name]: Number(e.target.value) });
    else setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    e.currentTarget.reset();
    console.log("tax Data", data);
    api
      .post("/admin/shop/addTax", data)
      .then((res) => {
        console.log(res.data.data);
        notify(res.data.data, "success");
        setRender(!render);
        setData("");
        props.settaxRender(!props.taxRender);
      })
      .catch((err) => {
        console.log(err);
        notify(err, "danger");
      });
  }
  // console.log("taxlist", props);

  return (
    <div>
      <div className="notification-popup">
        <NotificationAlert ref={notiRef} />
      </div>
      <Row>
        {/* <Col xs={12} md={12}> */}
        <div className="col-12">
          <section className="box ">
            <header className="panel_header">
              <h2 className="title float-left">Add Tax</h2>
            </header>
            <div className="content-body">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-8">
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label htmlFor="exampleEmail7">Tax Name</Label>
                      <Input
                        type="text"
                        name="taxName"
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="exampleEmail7">Tax Percentage</Label>
                      <Input
                        type="number"
                        name="taxPercentage"
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup style={{ marginBottom: "0px" }}>
                      <button type="submit" className="btn btn-primary" style={{backgroundColor:"#0a9a73"}}>
                        Submit
                      </button>
                    </FormGroup>
                  </Form>
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* Tax Table */}
        <div className="col-12">
          <section className="box ">
            <header className="panel_header">
              <h2 className="title float-left">Tax Lists</h2>
            </header>
            <div className="content-body">
              <div className="row">
                <div className="col-lg-12 dt-disp">
                  <Datatable
                    tableHeader={header}
                    tableBody={taxlist}
                    keyName="userTable"
                    tableClass="striped table-hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[5, 10, 15, 20, 30]}
                    initialSort={{ prop: "id", isAscending: true }}
                    //   onSort={onSortFunction}
                    labels={customLabels}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* </Col> */}
      </Row>
    </div>
  );
};

export default Tax;
