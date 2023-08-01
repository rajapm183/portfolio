import React, { useEffect, useState, useRef } from "react";
import { Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import "./banner.css";
import Cropper from "../Cropper";
import api, { baseURL } from "../../Axios";
import Swal from "sweetalert2";
const AddBanner = (props) => {
  const notiRef = useRef();
  const [data, setData] = useState({
    image: "",
  });
  const [appbannerlist, setAppBannerlist] = useState([]);
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [isError, setIsError] = useState(false);
  function deletee(i) {
    api.post("/admin/all/deleteBanners", { id: i.id }).then(() => {
      api.get("/admin/all/getBanners").then((res) => {
        setAppBannerlist(res.data.data);
      });
    });
  }
  useEffect(() => {
    api.get("/admin/all/getBanners").then((res) => {
      setAppBannerlist(res.data.data);
    });
  }, [render]);

  function handleImageChange(e) {
    console.log("image", e);
    setData({ ...data, image: e });
  }

  function handleSubmit(e) {
    e.preventDefault();
    e.currentTarget.reset();
    const formdata = new FormData();
    Object.entries(data).map((data) => {
      formdata.append(data[0], data[1]);
    });

    api.post("admin/all/addBanners", formdata).then((res) => {
      setRender(!render);
      setData("");
      Swal.fire(
        'Added!',
        'Banner has been Added.',
        'success'
      )
    });
  }

  return (
    <div>
      <div className="content">
        {/* <div className="notification-popup">
          <NotificationAlert ref={notiRef} />
        </div> */}
        <Row>
          <Col xs={12} md={12}>
            <div className="page-title">
              <div className="float-left">
                <h1 className="title">Banner</h1>
              </div>
            </div>

            <div className="col-12">
              <section className="box ">
                <header className="panel_header">
                  <h1
                    className="title float-left"
                    style={{ textTransform: "capitalize", fontWeight: "500" }}
                  >
                    Add Banner
                  </h1>
                </header>
                <div className="content-body">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-8">
                      <Form onSubmit={handleSubmit}>
                        <FormGroup>
                          <Label
                            htmlFor="bannerImage"
                            style={{
                              color: "#000",
                              fontWeight: "500",
                              fontSize: "16px",
                            }}
                          >
                            Banner Image
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
                            className="btn"
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

            <div className="container-fluid p-3 mt-5">
              <section className="box ">
                <table className="table table-sm mt-3">
                  <thead
                    className="thead"
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    <tr>
                      <th
                        style={{
                          textAlign: "center",
                          padding: "10px",
                          width: "20%",
                          fontSize: "16px",
                        }}
                      >
                        S No
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          padding: "10px",
                          fontSize: "16px",
                        }}
                      >
                        App Banner Image{" "}
                      </th>
                      {/* <th style={{ textAlign: "left",padding:"10px" }}> Product Type</th>
                        <th style={{ textAlign: "left",padding:"10px" }}> Status</th> */}
                      <th
                        style={{
                          textAlign: "center",
                          padding: "10px",
                          fontSize: "16px",
                        }}
                      >
                        {" "}
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(appbannerlist) &&
                    appbannerlist.length > 0 ? (
                      appbannerlist.map((banner, index) => (
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
                          <td style={{ textAlign: "center" }}>
                            <img
                              src={baseURL + banner.image}
                              style={{ height: "100px", width: "150px" }}
                            />
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <span
                              className="badge "
                              onClick={() => deletee(banner)}
                              style={{
                                cursor: "pointer",
                                background: "red",
                                color: "#fff",
                              }}
                            >
                              <span>Delete</span>
                            </span>
                          </td>
                          {/* <td>  {x.status == "ACTIVE" ? <span class="badge badge-pill badge-success">Active</span> : null}
                                    {x.status == "INACTIVE" ? <span class="badge badge-pill badge-warning">Inactive</span> : null}
                                    {x.status == "TERMINATED" ? <span class="badge badge-pill badge-danger">Terminated</span> : null}
                                </td> */}
                        </tr>
                      ))
                    ) : (
                      <div>No Banner Found</div>
                    )}
                  </tbody>
                </table>
              </section>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AddBanner;
