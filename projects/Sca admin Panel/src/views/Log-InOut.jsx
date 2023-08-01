import React, { useEffect, useRef, useState } from "react";
import { Row, Col } from "reactstrap";
import NotificationAlert from "react-notification-alert";
import api from "../Axios";

const Login = () => {
  const ref = useRef();
  const notiRef = useRef();

  useEffect(() => {
    const load = () => {
      ref.current.focus();
    };
    load();
  }, []);

  function notify(err) {
    // var color = Math.floor(Math.random() * 5 + 1);
    var type = "danger";

    var options = {};
    options = {
      place: "tc",
      message: (
        <div className="notification-msg">
          <div className="text-center">{err}</div>
        </div>
      ),
      type: type,
      icon: "",
      autoDismiss: 5,
    };

    notiRef.current.notificationAlert(options);
  }

  const [err, setErr] = useState("  ");
  const [logdata, setLogdata] = useState({
    userName: "",
    password: "",
    latLong: [],
  });

  var x = document.getElementById("root");

  async function getLocation() {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function showPosition(position) {
    login({
      ...logdata,
      latLong: [position.coords.latitude, position.coords.longitude],
    });
    return logdata.latLong.push([
      position.coords.latitude,
      position.coords.longitude,
    ]);
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        notify("User denied the request for Geolocation.");
        // getLocation();
        // x.innerHTML = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        notify("Location information is unavailable.");
        // x.innerHTML = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        notify("The request to get user location timed out.");
        // x.innerHTML = "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        notify("An unknown error occurred.");
        // x.innerHTML = "An unknown error occurred.";
        break;
    }
  }

  const setData = (e) => {
    setLogdata({ ...logdata, [e.target.name]: e.target.value });
  };

  function login(data = logdata) {
    api
      .post("/admin/auth/login", data)
      .then((res) => {
        console.log(res.data.data.token);
        if (
          res.data.data.token !== "" &&
          res.data.data.token !== null &&
          res.data.data.token !== undefined
        ) {
          window.location.href = "/";
          localStorage.setItem("AuthId", res.data.data.token);
        }

        if (res.data.data && typeof res.data.data) {
          setErr(res.data.data);
          notify(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
        notify(err);
      });
  }

  console.log("err", err);

  function handleSubmit(e) {
    e.preventDefault();
    if (!logdata.latLong[1]) getLocation();
    else login();
  }

  return (
    <div className="wrapper login_page" style={{ overflow: "hidden" }}>
      <div className="main-panel">
        <Row xs={9} md={9}>
          <Col xs={12} md={12}>
            <div className="container-fluid mt-5 pt-5">
              <div className="login-wrapper row">
                <div
                  id="login"
                  className="login loginpage offset-xl-4 offset-lg-3 offset-md-3 offset-0 col-12 col-md-6 col-xl-4"
                >
                  <div style={{ textAlign: "center" }}>
                    <h2
                      style={{
                        color: "#EB3143",
                        fontWeight: "700",
                        fontSize: "35px",
                        letterSpacing: "1px",
                      }}
                    >
                      Welcome to A1 Matrimony
                    </h2>
                  </div>
                  <div className="notification-popup">
                    <NotificationAlert ref={notiRef} />
                  </div>
                  <form name="loginform" id="loginform" onSubmit={handleSubmit}>
                    <p>
                      <label htmlFor="user_login">
                        Email
                        <br />
                        <input
                          type="text"
                          name="email"
                          placeholder="Enter email"
                          id="user_name"
                          className="form-control"
                          ref={ref}
                          onChange={setData}
                        />
                      </label>
                    </p>
                    <p>
                      <label htmlFor="user_pass">
                        Password
                        <br />
                        <input
                          type="password"
                          placeholder="Enter password"
                          name="password"
                          id="user_pass"
                          className="input"
                          size="20"
                          onChange={setData}
                        />
                      </label>
                    </p>
                    <p className="submit">
                      <input
                        type="submit"
                        name="wp-submit"
                        id="wp-submit"
                        className="btn btn-danger btn-block"
                        value="Sign In"
                      />
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export const Logout = () => {
  api
    .post("/admin/auth/logout")
    .then((res) => {
      console.log(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  window.location.href = "/login";
  localStorage.clear();
};

export default Login;
