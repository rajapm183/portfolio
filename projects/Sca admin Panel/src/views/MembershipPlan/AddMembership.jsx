import React, { useEffect, useState, useRef } from "react";
import { Form, FormGroup, Label, Input, Row, Col, Container } from "reactstrap";
import "./ReactQuills";
import "../Banner/banner.css";
import api from "../../Axios";
import NotificationAlert from "react-notification-alert";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import Swal from "sweetalert2";


const AddMembership = () => {
  const notiRef = useRef();
  const [data, setData] = useState({
    selectPlan: "",
    name: "",
    duration: 0,
    period: "",
    descriptions: [],
    total: 0,
    gst: 0,
    discount: 0,
    grandTotal: 0,
    accessMobile:0,
  });
  const [inputFields, setInputFields] = useState([
    {
      descriptions: " ",
    },
  ]);
  const handleAdd = () => {
    setInputFields([
      ...inputFields,
      {
        descriptions: "",
      },
    ]);
  };

  // removes input
  const handleRemove = (index) => {
    if (inputFields.length !== 1) {
      const values = [...inputFields];
      values.splice(index, 1);
      setInputFields(values);
    }
  };
  const [render, setRender] = useState(false);

  const handleChange = (e, index) => {
    if (e.target.name !== "descriptions") {
      setData({ ...data, [e.target.name]: e.target.value });
    } else {
      data.descriptions[index] = e.target.value;
      setData({ ...data });
    }
  };
  console.log(data);
  function handleSubmit(e) {
    e.preventDefault();

    e.currentTarget.reset();

    const postingData = { ...data,
       duration: parseInt(data.duration),
       total:parseInt(data.total),
       gst:parseInt(data.gst),
       discount:parseInt(data.discount),
       grandTotal:parseInt(data.grandTotal),
       accessMobile:parseInt(data.accessMobile)
      };

    api.post("/admin/membership/addMembership", postingData).then((res) => {
      setRender(!render);
      setData("");
      Swal.fire(
        'Added!',
        'Membership plan has been Added.',
        'success'
      )
    });
  }

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
                <h1 className="title">Membership Plan</h1>
              </div>
            </div>

            <div className="col-12">
              <section className="box ">
                <header className="panel_header">
                  <h1
                    className="title float-left"
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "500",
                      padding: "50px 50px",
                    }}
                  >
                    Add Membership Plan
                  </h1>
                </header>
                <div className="content-body">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-8">
                      <Form onSubmit={handleSubmit}>
                        <FormGroup>
                          <label>Select Plan</label>
                          <select
                            onChange={handleChange}
                            name="selectPlan"
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option></option>
                            <option value="regular">Regular</option>
                            <option value="prime">Prime</option>
                          </select>
                        </FormGroup>
                        <FormGroup>
                          <Label>Name</Label>
                          <Input
                            type="text"
                            onChange={handleChange}
                            name="name"
                          />
                        </FormGroup>

                        <FormGroup>
                          <label>Period</label>
                          <select
                            onChange={handleChange}
                            name="period"
                            className="form-select"
                            aria-label="Default select example"
                          >
                            <option></option>
                            <option value="day">Day</option>
                            <option value="month">Month</option>
                            <option value="year">Year</option>
                          </select>
                        </FormGroup>

                        <FormGroup>
                          <Label>Duration</Label>
                          <Input
                            type="number"
                            onChange={handleChange}
                            name="duration"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label>Description</Label>
                          {inputFields.map((item, index) => (
                            <div key={index}  style={{padding:"10px"}}>
                              <Input
                                name="descriptions"
                                index={index}
                                item={item}
                                onChange={(event) => {
                                  handleChange(event, index);
                                }}
                              />
                            </div>
                          ))}
                          <div>
                            <IconButton onClick={handleRemove} style={{
                            color:"black",
                            marginTop:"5px",
                            }}>
                              <RemoveIcon />
                            </IconButton>
                            <IconButton onClick={handleAdd} style={{
                            color:"black",
                            float:"right",
                            marginTop:"5px"}}>
                              <AddIcon />
                            </IconButton>
                          </div>
                        </FormGroup>

                        <FormGroup>
                          <Label>Total</Label>
                          <Input
                            type="number"
                            onChange={handleChange}
                            name="total"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label>Gst</Label>
                          <Input
                            type="number"
                            onChange={handleChange}
                            name="gst"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label>Discount</Label>
                          <Input
                            type="number"
                            onChange={handleChange}
                            name="discount"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label>Grant Total</Label>
                          <Input
                            type="number"
                            onChange={handleChange}
                            name="grandTotal"
                          />
                        </FormGroup>
                        <FormGroup>
                        <Label>Access Mobile Numbers</Label>
                        <Input
                          type="number"
                          onChange={handleChange}
                          name="accessMobile"
                        />
                      </FormGroup>
                        <FormGroup style={{ marginBottom: "0px" }}>
                          <button
                            type="submit"
                            className="btn "
                            style={{
                              padding: "5px 10px",
                              background: "black",
                              color: "white",
                              fontWeight: "500",
                            }}
                          >
                            Submit
                          </button>
                        </FormGroup>
                      </Form>
                    </div>
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

export default AddMembership;
