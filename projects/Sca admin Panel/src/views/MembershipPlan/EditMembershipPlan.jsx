import React, { useEffect, useState, useRef } from "react";
import { Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import "./ReactQuills";
import "../Banner/banner.css";
import api from "../../Axios";
import NotificationAlert from "react-notification-alert";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import { duration } from "moment";

const EditMembershipPlan = () => {
  const notiRef = useRef();
  // const [data, setData] = useState({
  //   id: id,
  //   selectPlan: "",
  //   name: "",
  //   duration: 0,
  //   period: "",
  //   descriptions: [],
  //   total: 0,
  //   gst: 0,
  //   discount: 0,
  //   grandTotal: 0,
  // });

  const [datas, setDatas] = useState({
    id: 0,
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
    status: "active",
  });

  const [inputFields, setInputFields] = useState([
    {
      descriptions: " ",
    },
  ]);

  const { id, selectPlan, name } = useParams();

  const handleInputChange = (e, index) => {
    if (e.target.name !== "descriptions") {
    setDatas({ ...datas, [e.target.name]: e.target.value });
    } else {
      datas.descriptions[index] = e.target.value;
      setDatas({...datas});
    }
  };
  console.log(datas.descriptions);
  // const handleInputChange = (e) => {
  //   setDatas({ ...datas, [e.target.name]: e.target.value });
  // };

  // const handleInputChange = (e, index) => {
  //   if (e.target.name !== "descriptions") {
  //     setDatas({  [e.target.name]: e.target.value });
  //   } else {
  //     datas.descriptions[index] = e.target.value;
  //     setDatas({ ...datas });
  //   }
  // };
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const postingDatas = { ...datas,
      duration: parseInt(datas.duration),
      total:parseInt(datas.total),
      gst:parseInt(datas.gst),
      discount:parseInt(datas.discount),
      grandTotal:parseInt(datas.grandTotal),
      accessMobile:parseInt(datas.accessMobile)
     };


    api.post("/admin/membership/updateMembership",postingDatas ).then((res) => {
      setDatas(res.data.data);
      console.log(res.data.data);
      if (res.data.data === "Updated successfully") {
        Swal.fire("Updated!", "Membership plan has been Updated.", "success");
      } else {
        Swal.fire({
          icon: "error",
          text: "Something went wrong",
        });
      }
    });
  };

  useEffect(() => {
    api
      .post("admin/membership/getMembership", { id, selectPlan, name })
      .then((res) => {
        setDatas(res.data.data);
        setInputFields(res.data.data.descriptions)
      });
  }, []);

  console.log(datas);

  return (
    <>
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
                      Edit Membership Plan
                    </h1>
                  </header>

                  <div className="content-body">
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-8">
                        <Form>
                          <FormGroup>
                            <Label>Id</Label>
                            <Input
                              type="number"
                              required
                              onChange={handleInputChange}
                              value={datas.id}
                              name="id"
                            />
                          </FormGroup>

                          <FormGroup>
                            <label>Select plan</label>
                            <select
                              onChange={handleInputChange}
                              name="selectPlan"
                              required
                              className="form-select"
                              aria-label="Default select example"
                              value={datas.selectPlan}
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
                              onChange={handleInputChange}
                              required
                              value={datas.name}
                              name="name"
                            />
                          </FormGroup>

                          <FormGroup>
                            <label>Period</label>
                            <select
                              onChange={handleInputChange}
                              name="period"
                              className="form-select"
                              required
                              aria-label="Default select example"
                              value={datas.period}
                            >
                              <option disabled hidden>
                                Select Plan
                              </option>
                              <option value="day">Day</option>
                              <option value="month">Month</option>
                              <option value="year">Year</option>
                            </select>
                          </FormGroup>

                          <FormGroup>
                            <Label>Duration</Label>
                            <Input
                              type="number"
                              onChange={handleInputChange}
                              name="duration"
                              required
                              value={datas.duration}
                            />
                          </FormGroup>

                          <FormGroup>
                            <Label>Description</Label>
                            {inputFields.map((item, index) => (
                            <div key={index}  style={{padding:"10px"}}>
                              <Input
                                name="descriptions"
                                index={index}
                                // value={datas.descriptions}
                                item={item}
                                onChange={(event) => {
                                  handleInputChange(event, index);
                                }}
                              />
                            </div>
                          ))}
                            <div>
                              <IconButton
                                onClick={handleRemove}
                                style={{
                                  color: "black",
                                  marginTop: "5px",
                                }}
                              >
                                <RemoveIcon />
                              </IconButton>
                              <IconButton
                                onClick={handleAdd}
                                style={{
                                  color: "black",
                                  float: "right",
                                  marginTop: "5px",
                                }}
                              >
                                <AddIcon />
                              </IconButton>
                            </div>
                          </FormGroup>

                          <FormGroup>
                            <Label>Total</Label>
                            <Input
                              type="number"
                              onChange={handleInputChange}
                              name="total"
                              required
                              value={datas.total}
                            />
                          </FormGroup>

                          <FormGroup>
                            <Label>Gst</Label>
                            <Input
                              type="number"
                              onChange={handleInputChange}
                              name="gst"
                              required
                              value={datas.gst}
                            />
                          </FormGroup>

                          <FormGroup>
                            <Label>Discount</Label>
                            <Input
                              type="number"
                              onChange={handleInputChange}
                              name="discount"
                              required
                              value={datas.discount}
                            />
                          </FormGroup>

                          <FormGroup>
                            <Label>Grant Total</Label>
                            <Input
                              type="number"
                              onChange={handleInputChange}
                              name="grandTotal"
                              required
                              value={datas.grandTotal}
                            />
                          </FormGroup>
                          <FormGroup>
                          <Label>Access Mobile Numbers</Label>
                          <Input
                            type="number"
                            onChange={handleInputChange}
                            name="accessMobile"
                          />
                        </FormGroup>
                          <FormGroup style={{ marginBottom: "0px" }}>
                            <button
                              type="submit"
                              className="btn "
                              onClick={handleSubmit}
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
    </>
  );
};

export default EditMembershipPlan;
