import moment from "moment/moment";
import React from "react";
import { Link } from "react-router-dom";
import { Col, Container ,Button} from "reactstrap";
import { baseURL } from "../Axios";

const Usercard = ({
  id,
  image,
  name,
  age,
  gender,
  dob,
  state,
  status,
  email,
  onDelete,onActive,
  errorButtonText = "Inactive",
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
              {name}
            </h5>

            <ul className="list">
              <li>Age: {age}</li>
              <li>
                Gender:
                {gender}
              </li>
              <li>DOB: {moment(dob).format("DD-MM-YYYY")}</li>
              <li style={{ textTransform: "capitalize" }}>
                State:
                {state}
              </li>
            </ul>
          </div>
        </Container>

        <div
          className="btns"
          style={{ display: "flex", justifyContent: "center", alignItems:"center"  }}
        >
          <Link
            to={"/dashboard1/" + id}
            className="btn"
            style={{
              fontSize: "14px",
              fontWeight: "500",
              background: "green",
              color: "white",
              padding:"5px 10px"
            }}
          >
            <i className="bi bi-eye-fill"></i> View
          </Link>
     {status === "terminated" ? null :   <Button
            className="btn"
            onClick={onDelete}
            style={{
              fontSize: "14px",
              fontWeight: "500",
              background: "#eb3143",
              color: "white",
              padding:"5px 10px"
            }}
          >
      Delete
          </Button>
          }
        {status === "terminated" ? <a
        href="#"
        className="btn" 
        disabled
        style={{
          fontSize: "14px",
       
      
          fontWeight: "500",
          background: status == "terminated" ? "gray" : "#00008B",
          color: "white",
          padding:"5px 10px"
        }}
      
      >
        {status}
      </a> : <a
      href="#"
      className="btn" 
  
      style={{
        fontSize: "14px",
        fontWeight: "500",
        background: status == "active" ? "green" : "#00008B",
        color: "white",
        padding:"5px 10px"
      }}
      onClick={onActive}
    >
      {status}
    </a>}  
        </div>
      </div>
    </Col>
  );
};

export default Usercard;
