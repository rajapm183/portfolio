import React from "react";
import { Row, Col} from "reactstrap";
import { useEffect } from "react";
import api from "../../../Axios";
import { useState } from "react";
// import { Link } from "react-router-dom";
import {
  // FiUsers,
  FiUserCheck,
  FiUserX,
  // FiUser,
  // FiWifi,
  // FiHash,
  // FiMessageSquare,
  // FiCloudDrizzle
} from "react-icons/fi";
import { SlWallet } from "react-icons/sl";
import {  BsChatLeftTextFill ,
   BsGridFill , 
   BsPeopleFill , 
   BsPersonDashFill ,
   BsPersonCheckFill,
   BsPersonFill} from "react-icons/bs";
// import { BiRupee , } from "react-icons/bi";
import Usercard from "../../../components/Usercard";
import DashboardCard from "../../../components/DashboardCard";

const Dashboard9 = () => {
  const [render, setRender] = useState(false);
  const [getuser, setGetuser] = useState([]);
  const [data, setData] = useState({
    activeUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    terminatedUsers: 0,
    paidUsers: 0,
    unpaidUsers: 0,
    succeseUsers: 0,
    membershipUsers: 0,
    smsCount:0,
    paymentCount:0,
    horoscopeApiCount:0,
  });

  useEffect(() => {
    api.get("/admin/adminDashboard/count").then((res) => {
      console.log(res.data.data);
      setData(res.data.data);
    });
  }, []);
  useEffect(() => {
    api.get("/admin/allUsers/getRecentUsers").then((res) => {
      setGetuser(res.data.data);

      console.log(res.data.data);

      Array.isArray(res.data.data) && res.data.data.map((dat) => dat.images);
    });
  }, []);
  // function verify(i) {
  //   api.post("/admin/adminDashboard/imageVerified", { id: i.id }).then(() => {
  //     api.get("/admin/allUsers/getRecentUsers").then((res) => {
  //       setGetuser(res.data.data);
  //     });
  //   });
  // }
  function deletee(i) {
    api.post("/admin/manageuserProfile/terminateUser", { id: i.id }).then(() => {
      api.get("/admin/allUsers/getAllUsers").then((res) => {
        setGetuser(res.data.data);
      });
    });
  }
  function activeinactive(i) {
    api.post("/admin/manageuserProfile/deleteUser", { id: i.id }).then(() => {
      api.get("/admin/allUsers/getAllUsers").then((res) => {
        setGetuser(res.data.data);
      });
    });
  }
  return (
    <div>
      <div className="content">
        <Row>
          <Col xs={12} md={12}>
            <div className="page-title">
              <div className="float-left">
                <h1 className="title">Dashboard</h1>
              </div>
            </div>

            <div className="row margin-0">
              <DashboardCard
                title={"Payments"}
                count={"₹" + " " + data.paymentCount}
                icon={<SlWallet className="icon-lg" />}
              />
              <DashboardCard
                title={"SMS Counts"}
                count={data.smsCount}
                icon={<BsChatLeftTextFill className="icon-lg" />}
              />
              <DashboardCard
                title={"Horoscope API Hit Count"}
                count={data.horoscopeApiCount}
                icon={<BsGridFill className="icon-lg" />}
              />
              <DashboardCard
                title={"All Users"}
                count={data.allUsers}
                icon={<BsPersonFill className="icon-lg" />}
              />
              <DashboardCard
                title={"Active Users"}
                count={data.activeUsers}
                icon={<FiUserCheck className="icon-lg" />}
              />
              <DashboardCard
                title={"Inactive Users"}
                count={data.inactiveUsers}
                icon={<FiUserX className="icon-lg" />}
              />
              <DashboardCard
                title={"Paid Users"}
                count={data.paidUsers}
                icon={<BsPersonCheckFill className="icon-lg" />}
              />
              <DashboardCard
                title={"Unpaid Users"}
                count={data.unpaidUsers}
                icon={<BsPersonDashFill className="icon-lg" />}
              />
              <DashboardCard
                title={"Success Stories"}
                count={data.succeseUsers}
                icon={<BsPeopleFill className="icon-lg" />}
              />
            </div>
          </Col>
        </Row>

        {getuser == "Data Not Found!" ? (
          <></>
        ) : (
          <>
            <h3 style={{ textTransform: "uppercase" }}>Recent Users</h3>
            <Row>
              {Array.isArray(getuser) && getuser != "Data Not Found!" ? (
                getuser.map((user, index) => (
                  <Usercard
                    key={index}
                    id={user.id}
                    name={user.userName}
                    image={user.images}
                    state={user.state}
                    dob={user.dob}
                    gender={user.gender}
                    age={user.age}
                    status={user.status}
                    onActive={() => activeinactive(user)}
                      onDelete={() => deletee(user)}
                  />
                ))
              ) : (
                <div style={{marginLeft:"500px",marginTop:"250px"}}>
                <h3> Profile  Not   Found</h3>
                </div>
              )}
            </Row>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard9;
