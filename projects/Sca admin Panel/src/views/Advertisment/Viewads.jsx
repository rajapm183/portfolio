import React, { useEffect, useState, useRef } from "react";
import { Form, FormGroup, Label, Input, Row, Col ,Table} from "reactstrap";
// import "../Banner/banner.css";
import Cropper from "../Cropper";
import api, { baseURL } from "../../Axios";
import NotificationAlert from "react-notification-alert";
import viewads from "./Viewads.module.css";
import { Link } from "react-router-dom";
import Select from "react-select";
const Viewads = () => {
  const notiRef = useRef();
  // const [data, setData] = useState({
  //   name: "",
  //   adLinkk: "",
  //   adLevel: "",
  //   image: "",
  //   contactPerson: "",
  //   phone: "",
  //   date: "",
  // });
  const [adslist, setAdslist] = useState([]);
  const [render, setRender] = useState(false);

  function deletee(i) {
    console.log(i);
    api.post("/admin/adminDashboard/deleteAd", { id: i.id }).then(() => {
      api.get("/admin/adminDashboard/viewAd").then((res) => {
        setAdslist(res.data.data);
      });
    });
  }
  useEffect(() => {
    api.get("/admin/adminDashboard/viewAd").then((res) => {
      setAdslist(res.data.data);
      console.log(res.data.data);
    });
  }, [render]);

  return (
    <div>
      <div className="content">
        <div className="notification-popup">
          <NotificationAlert ref={notiRef} />
        </div>
        <Row>
          <Col xs={12} md={12}>
            <Row>
              <div className="container-fluid p-3 mt-5">
                <section className="box">
                 
                  <Table>
                    <thead
                      style={{
                        background: "black",
                        color: "white",
                        marginLeft: "10px",
                      }}
                    >
                      <tr>
                        <th style={{ textAlign: "center" }}>S No</th>
                        <th style={{ textAlign: "center" }}>Name</th>
                        <th style={{ textAlign: "center" }}>Ads Link</th>
                        <th style={{ textAlign: "center" }}>Ads Image</th>
                        <th style={{ textAlign: "center" }}>Contact Name</th>
                        <th style={{ textAlign: "center" }}>Phone Number</th>
                        <th style={{ textAlign: "center" }}>Date</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(adslist) && adslist.length > 0 ? (
                        adslist.map((suces, index) => (
                          <tr key={index}>
                            <td
                              style={{
                                textAlign: "center",
                                color: "#000",
                                fontWeight: "500",
                              }}
                            >
                              {index + 1}
                            </td>
                            <td
                              style={{
                                textAlign: "center",
                                color: "#000",
                                fontWeight: "500",
                                textTransform: "capitalize",
                              }}
                            >
                              {suces.name}
                            </td>

                            <td
                              style={{
                                textAlign: "center",
                                color: "#000",
                                fontWeight: "500",
                                textTransform: "capitalize",
                              }}
                            >
                              {suces.link}
                            </td>

                            <td style={{ textAlign: "center" }}>
                              <img
                                src={baseURL + suces.image}
                                style={{ height: "100px", width: "150px" }}
                              />
                            </td>


                            <td
                              style={{
                                textAlign: "center",
                                color: "#000",
                                fontWeight: "500",
                                textTransform: "capitalize",
                              }}
                            >
                              {suces.contactPerson}
                            </td>

                            <td
                              style={{
                                textAlign: "center",
                                color: "#000",
                                fontWeight: "500",
                                textTransform: "capitalize",
                              }}
                            >
                              {suces.phone}
                            </td>

                            <td
                              style={{
                                textAlign: "center",
                                color: "#000",
                                fontWeight: "500",
                                textTransform: "capitalize",
                              }}
                            >
                              {suces.date}
                            </td>

                            <td style={{ textAlign: "center"}}>
                              <span
                                className="badge "
                                onClick={() => deletee(suces)}
                                style={{
                                  cursor: "pointer",
                                  background: "red",
                                  color: "#fff",
                                }}
                              >
                                <span>Delete</span>
                              </span>
                            </td>                      
                                </tr>
                        ))
                      ) : (
                        <div>
                          <p>Profile Not Found</p>
                        </div>
                      )}
                    </tbody>
                  </Table>
    
                </section>
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Viewads;
