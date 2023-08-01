import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import api from "../Axios";
import moment from "moment";

const AdminProfile = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    api
      .get("/admin/profile/viewProfile")
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // function checkArray(data) {
  //   if (Array.isArray(data)) return data;
  //   else if (typeof data === "object") return [data];
  //   else return [];
  // }

  return (
    <div>
      <div className="content">
        <Row>
          <Col xs={12} md={12}>
            <div className="page-title">
              <div className="float-left">
                <h1 className="title">Admin Profile</h1>
              </div>
            </div>

            <div className="col-xl-12">
              <section className="box profile-page" style={{width:"500px"}}>
                <div className="content-body">
                  <div className="col-12">
                    <div className="row uprofile">
                      <div>
                        <div className="uprofile-name col-xl-10 col-lg-9 col-md-9 col-sm-8 col-12">
                          <h3 className="uprofile-owner">{data.username}</h3>

                          <div className="clearfix"></div>
                          <div className="row">
                            <div className="col-lg-4 col-md-5 col-sm-6">
                              <p>
                             
                               <span> {data.email}</span>
                              </p>
                              <p>
                    
                                {data.phone}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default AdminProfile;
