import React, { useEffect, useState, useRef } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Table,
  // Container,
  // Dropdown,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  // UncontrolledDropdown,
} from "reactstrap";
import { AiOutlineArrowRight } from "react-icons/ai";
import Swal from "sweetalert2";
// import "../Banner/banner.css";
import Cropper from "../Cropper";
import api, { baseURL } from "../../Axios";
import NotificationAlert from "react-notification-alert";
// import ModalImage from "react-modal-image";
const Viewsucc = () => {
  const notiRef = useRef();
  const [data, setData] = useState({
    brideName: "",
    groomName: "",
    groomPhoneNumber: "",
    bridePhoneNumber: "",
    content: "",
    image: "",
  });

  const [render, setRender] = useState(false);
  const [userlist, setUserlist] = useState("");
  const [bridelist, setBridelist] = useState("");
  const [success, setSuccess] = useState([]);
  const [approvel, setApprovel] = useState("Approve");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  function deletee(i) {
    api.post("/admin/successStories/deleteStories", { id: i.id }).then(() => {
      api.get("/admin/successStories/fetchStories").then((res) => {
        setSuccess(res.data.data);
      });
    });
  }
  function approve(i) {
    api
      .post("/admin/successStories/approveStory", {
        groomPhoneNumber: i.groomPhoneNumber,
        bridePhoneNumber: i.bridePhoneNumber,
      })
      .then((res) => {
        if (res.data.data === "Story approved") {
          alert("Story approved");
          setApprovel("Approved");
        }
        api.get("/admin/successStories/fetchStories").then((res) => {
          setSuccess(res.data.data);
        });
      });
  }
  useEffect(() => {
    api.get("/admin/successStories/fetchStories").then((res) => {
      setSuccess(res.data.data);
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
      console.log(data);
    });

    api.post("/admin/successStories/addStories", formdata).then((res) => {
      setRender(!render);
      setData("");
      Swal.fire(
        'Added!',
        'SuccessStory has been Added.',
        'success'
      )
    });
  }

  const handleuser = () => {
    api
      .post("/admin/successStories/searchByPhone", {
        phoneNumber: data.groomPhoneNumber,
      })
      .then((res) => {
        setUserlist(res.data.data);
        setRender(!render);
      });
  };
  console.log(userlist);
  const handleusers = () => {
    api
      .post("/admin/successStories/searchByPhone", {
        phoneNumber: data.bridePhoneNumber,
      })
      .then((res) => {
        setBridelist(res.data.data);
        setRender(!render);
      });
  };
  console.log(bridelist);
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
                <h1 className="title">Success Story</h1>
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
                    }}
                  >
                    Add Success Story
                  </h1>
                </header>
                <div className="content-body">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                      <Form onSubmit={handleSubmit}>
                        <FormGroup>
                          <Label>Groom Phone Number</Label>
                          <Input
                            onChange={handleChange}
                            type="text"
                            name="groomPhoneNumber"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label>Bride Phone Number</Label>
                          <Input
                            onChange={handleChange}
                            type="text"
                            name="bridePhoneNumber"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label>Content</Label>
                          <Input
                            onChange={handleChange}
                            type="text"
                            name="content"
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
                            Success Story Image
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
                    <div className="col-12 col-sm-12 col-md-5 col-lg-2 col-xl-2">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "40px",
                        }}
                      >
                        <button
                          onClick={handleuser}
                          style={{
                            borderRadius: "5px",
                            backgroundColor: "black",
                            color: "white",
                          }}
                        >
                          <AiOutlineArrowRight style={{ fontSize: "25px" }} />
                        </button>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "70px",
                        }}
                      >
                        <button
                          onClick={handleusers}
                          style={{
                            borderRadius: "5px",
                            backgroundColor: "black",
                            color: "white",
                          }}
                        >
                          {" "}
                          <AiOutlineArrowRight style={{ fontSize: "25px" }} />
                        </button>
                      </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                      <FormGroup>
                        <Label for="exampleSelect">Groom Name</Label>
                        {userlist === "Profiles not found" ? (
                          <div>
                            <h4 style={{color:"red"}}>Groom Not Found</h4>
                          </div>
                        ) : (
                          <Input
                            type="select"
                            name="groomName"
                            id="exampleSelect"
                            onChange={handleChange}
                            required
                          >
                            <option>Select Groom Name</option>
                            {Array.isArray(userlist) &&
                              userlist.map((data, index) => (
                                <option key={index}>{data.userName}</option>
                              ))}
                          </Input>
                        )}
                      </FormGroup>

                      <FormGroup>
                        <Label for="exampleSelect">Bride Name</Label>
                        {bridelist === "Profiles not found" ? (
                          <div>
                            <h4 style={{color:"red"}}>Bride Not Found</h4>
                          </div>
                        ) : (
                          <Input
                            type="select"
                            name="brideName"
                            id="exampleSelect"
                            onChange={handleChange}
                            required
                          >
                            <option>Select Bride Name</option>
                            {Array.isArray(bridelist) &&
                              bridelist.map((data, index) => (
                                <option key={index}>{data.userName}</option>
                              ))}
                          </Input>
                        )}
                      </FormGroup>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <Row>
              <div className="container-fluid p-3 mt-5">
                <section className="box ">
                  <header className="panel_header">
                    <h1
                      className="ml-3"
                      style={{
                        textTransform: "capitalize",
                        fontWeight: "500",
                      }}
                    >
                      Success Stories List
                    </h1>
                  </header>
                  <Table>
                    <thead
                      style={{
                        background: "black",
                        color: "white"
                      }}
                    >
                      <tr>
                        <th style={{ textAlign: "center" }}>S No</th>
                        <th style={{ textAlign: "center" }}>Groom Name</th>
                        <th style={{ textAlign: "center" }}>Bride Name</th>
                        <th style={{ textAlign: "center" }}>Groom Number</th>
                        <th style={{ textAlign: "center" }}>Bride Number</th>
                        <th style={{ textAlign: "center" }}>Content</th>
                        <th style={{ textAlign: "center" }}> Success Story Image</th>
                        <th style={{ textAlign: "center" }}>Status</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(success) && success.length > 0 ? (
                        success.map((suces, index) => (
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
                              {suces.groomName}
                            </td>

                            <td
                              style={{
                                textAlign: "center",
                                color: "#000",
                                fontWeight: "500",
                                textTransform: "capitalize",
                              }}
                            >
                              {suces.brideName}
                            </td>

                            <td
                              style={{
                                textAlign: "center",
                                color: "#000",
                                fontWeight: "500",
                                textTransform: "capitalize",
                              }}
                            >
                              {suces.groomPhoneNumber}
                            </td>

                            <td
                              style={{
                                textAlign: "center",
                                color: "#000",
                                fontWeight: "500",
                                textTransform: "capitalize",
                              }}
                            >
                              {suces.bridePhoneNumber}
                            </td>

                            <td
                              style={{
                                textAlign: "center",
                                color: "#000",
                                fontWeight: "500",
                                textTransform: "capitalize",
                              }}
                            >
                              {suces.content}
                            </td>

                            <td style={{ textAlign: "center" }}>
                              <img
                                src={baseURL + suces.image}
                                style={{ height: "100px", width: "150px" }}
                              />
                            </td>

                            <td style={{ textAlign: "center" }}>
                              <span
                                className="badge"
                                onClick={() => approve(suces)}
                                style={{
                                  cursor: "pointer",
                                  background: "green",
                                  color: "#fff",
                                }}
                              >
                                <span>
                                  {suces.status == "approved"
                                    ? "Approved"
                                    : "UnApproved"}
                                </span>
                              </span>
                              </td>
                              <td  style={{ textAlign: "center" }}>
                              <span
                                className="badge"
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

export default Viewsucc;
