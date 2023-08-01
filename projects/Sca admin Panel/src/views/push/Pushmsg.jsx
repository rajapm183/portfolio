import React, { useEffect, useState, useRef } from "react";
import { Form, FormGroup, Label, Input, Row, Col, Container } from "reactstrap";
import "../Banner/banner.css";
import Cropper from "../Cropper";
import api from "../../Axios";
const Pushmsg = () => {
    const [data, setData] = useState({
        title: "",
        image: "",
  description:"",
      });
    
      const [render, setRender] = useState(false);
    const handleChange = (e) => {
        setData({...data,[e.target.name]:e.target.value});
          }
    function handleImageChange(e) {
        console.log("image", e);
        setData({ ...data, image: e });
      }
    
      function handleSubmit(e) {
        e.preventDefault();
        e.currentTarget.reset()
        const formdata = new FormData();
        Object.entries(data).map((data) => {
          formdata.append(data[0], data[1]);
          console.log(data)
        });
    
        api.post("/admin/pushMessaging/addPushMessage",formdata).then((res)=>{
         setRender(!render)
         setData("")
        })
      
    }
  return (
    <div>
        <Row>
            <Col xs={12} md={12}>
              <div className="page-title">
                <div className="float-left">
                  <h1 className="title">Push Message</h1>
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
                        padding: "0px",
                      }}
                    >
                      Add Push Message
                    </h1>
                  </header>
                  <div className="content-body">
                    <div className="row">
                      <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-8">
                        <Form onSubmit={handleSubmit}>
                          <FormGroup>
                            <Label >Title</Label>
                            <Input
                            onChange={handleChange}
                              type="text"
                  name="title"
                             
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label >Description</Label>
                            <Input
                            onChange={handleChange}
                              type="text"
                  name="description"
                             
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
                            Push Message Image
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
  )
}

export default Pushmsg;