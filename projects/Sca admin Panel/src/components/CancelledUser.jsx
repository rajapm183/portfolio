import React from "react";
import { Link } from "react-router-dom";
import { Col, Container } from "reactstrap";
import { baseURL } from "../Axios";

const CancelledUser = ({
  id,
  image,
  status,
  phone,
  profileId,
  email,
  name,
  state,
  onDelete,
}) => {
  return (
    <Col xs={12} md={6} lg={4} sm={12}>
      <div
        className="card"
        style={{
          width: "100%",
          padding: "20px 20px",
        }}
      >
        <Container
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <img
              src={baseURL + image}
              style={{ width: "120px", height: "120px" }}
              alt="..."
            />
          </div>
          <div className="card-body">
            <h5 className="card-title" style={{ color: "#eb3143" }}>
            {name}  <span
                    className="badge  mt-4 "
                    style={{
                      borderRadius: "10px",
                      fontWeight: "500",
                      backgroundColor: "black",
                    }}
                  >
                 
                    Profile Id: {profileId} 
                  </span>
            </h5>

            <ul className="list">
              <li>Email: {email}</li>
              <li>
              Phone:
                {phone}
              </li>
         
              <li style={{ textTransform: "capitalize" }}>
              
                {state}
              </li>
            </ul>
          </div>
        </Container>

        <div
          className="btns"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Link
            to={"/dashboard1/" + id}
            className="btn"
            style={{
              fontSize: "14px",
              fontWeight: "500",
              background: "green",
              color: "white",
            }}
          >
            <i className="bi bi-eye-fill"></i> View
          </Link>
          <Link
            to=""
            className="btn"
            style={{
              fontSize: "14px",
              fontWeight: "500",
              background: "#eb3143",
              color: "white",
            }}
          >
      Delete
          </Link>

          {status ?      <a
            href="#"
            className="btn"
            style={{
              fontSize: "14px",
              fontWeight: "500",
              background: status == "active" ? "green" : "#00008B",
              color: "white",
            }}
            onClick={onDelete}
          >
            <i className="bi bi-eye-fill"></i> {status}
          </a> : false}
        </div>
      </div>
    </Col>
  );
};

export default CancelledUser;
