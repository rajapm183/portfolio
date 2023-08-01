import React, { useEffect, useState, useRef } from "react";
import { Form, FormGroup, Label, Input, Row, Col, Container } from "reactstrap";
import "../Banner/banner.css";
import Cropper from "../Cropper";
import api from "../../Axios";
import NotificationAlert from "react-notification-alert";
import Swal from "sweetalert2";
const Createads = () => {
  const notiRef = useRef();
  const [data, setData] = useState({
    name: "",
    adLinkk: "",
    image: "",
    contactPerson: "",
    phone: "",
    date: "",
  });

  const [render, setRender] = useState(false);

  function handleImageChange(e) {
    console.log("image", e);
    setData({ ...data, image: e });
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  function handleSubmit(e) {
    e.preventDefault();
    if (data.phone.length !== 10) {
      alert("Please provide valid phone number");
    } else {
      e.currentTarget.reset();
      const formdata = new FormData();
      Object.entries(data).map((data) => {
        formdata.append(data[0], data[1]);
        console.log(data);
      });

      api.post("/admin/adminDashboard/createAd", formdata).then((res) => {
        setRender(!render);
        setData("");
        Swal.fire(
          'Added!',
          'Advertisment has been Added.',
          'success'
        )
      });
    }
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
                <h1 className="title">Advertisement</h1>
              </div>
            </div>

            <div className="col-12">
              <section className="box">
                <header className="panel_header">
                  <h1
                    className="title float-left"
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "500",
                    }}
                  >
                    Add Advertisements
                  </h1>
                </header>
                <div className="content-body">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-8">
                      <Form onSubmit={handleSubmit}>
                        <FormGroup>
                          <Label>Name</Label>
                          <Input
                            onChange={handleChange}
                            type="text"
                            name="name"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label>Advertisement Link</Label>
                          <Input
                            type="text"
                            name="adLinkk"
                            onChange={handleChange}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label>Contact Person</Label>
                          <Input
                            type="text"
                            name="contactPerson"
                            onChange={handleChange}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label>Contact Number</Label>
                          <Input
                            type="text"
                            name="phone"
                            onChange={handleChange}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label>Date</Label>
                          <Input
                            type="text"
                            onChange={handleChange}
                            name="date"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label
                            htmlFor="bannerImage"
                            style={{
                              color: "#000",
                              fontWeight: "500",
                              fontSize: "16px",
                            }}
                          >
                            Advertisement Image
                          </Label>
                          <Cropper
                            imageStore={handleImageChange}
                            aspectRatio={16 / 9}
                            reset={render}
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

export default Createads;
