import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
import { Navmenudropdown } from "components";
import { Navmenugroup } from "components";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
//import useravatar from "assets/img/profile.jpg";
import LOGO from "assets/img/bedwellLogo.svg";
import logodark from "assets/img/BFH_Logo-02.jpg";
import logo from "assets/img/BFH.svg";

var ps;
var currentmenu = "notset";

var IMGDIR = process.env.REACT_APP_IMGDIR;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
    this.state = {
      opendd: "",
      openmenu: "none",
      profilename: "Eric Nelson",
      profileimg: IMGDIR + "/images/profile/profile.jpg",
      profileposition: "Web Developer",
    };
    this.handleOpendd = this.handleOpendd.bind(this);
    this.handlecurrent = this.handlecurrent.bind(this);
  }

  handlecurrent(currentmenu) {
    //console.log("handlecurrent"+currentmenu);
    if (this.state.opendd !== "") {
      currentmenu = "";
    }
  }

  handleOpendd(open) {
    currentmenu = "";
    if (this.state.opendd === open) {
      this.setState({
        opendd: "",
      });
    } else {
      this.setState({
        opendd: open,
      });
    }
    //currentmenu = "";
    //console.log(open + this.state.opendd);
  }

  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname === routeName ? " active" : "";
  }
  componentDidMount() {
    if (this.props.admintype === "general") {
    } else if (this.props.admintype === "hospital") {
      this.setState({
        profileposition: "Surgeon",
        profileimg: IMGDIR + "/images/profile/profile-hospital.jpg",
        profilename: "Dianna Austin",
      });
    } else if (this.props.admintype === "university") {
      this.setState({
        profileposition: "Professor",
        profilename: "Henry Gibson",
        profileimg: IMGDIR + "/images/profile/profile-university.jpg",
      });
    } else if (this.props.admintype === "crm") {
      this.setState({
        profileposition: "Customer",
        profilename: "Rick  Woods",
        profileimg: IMGDIR + "/images/profile/profile-crm.jpg",
      });
    } else if (this.props.admintype === "music") {
      this.setState({
        profileposition: "Singer",
        profilename: "Kerry Flores",
        profileimg: IMGDIR + "/images/profile/profile-music.jpg",
      });
    } else if (this.props.admintype === "blog") {
      this.setState({
        profileposition: "Editor",
        profilename: "Alice Gross",
        profileimg: IMGDIR + "/images/profile/profile-blog.jpg",
      });
    } else if (this.props.admintype === "ecommerce") {
      this.setState({
        profileposition: "Vendor",
        profilename: "Jake  Daniel",
        profileimg: IMGDIR + "/images/profile/profile-ecommerce.jpg",
      });
    } else if (this.props.admintype === "freelance") {
      this.setState({
        profileposition: "Designer",
        profilename: "Eric Nelson",
        profileimg: IMGDIR + "/images/profile/profile-freelance.jpg",
      });
    } else if (this.props.admintype === "social") {
      this.setState({
        profileposition: "Artist",
        profilename: "Penny Taylor",
        profileimg: IMGDIR + "/images/profile/profile-social.jpg",
      });
    }

    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }

    //console.log(this.props.location.pathname);
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    const children = (child, parent) => {
      var links = [];
      if (child) {
        for (var i = 0; i < child.length; i++) {
          links.push(
            <li key={i}>
              <NavLink
                to={child[i].path}
                className="nav-link"
                activeClassName="active"
              >
                <span>{child[i].name}</span>
              </NavLink>
            </li>
          );
          //console.log(child[i].parent + this.props.location.pathname + child[i].path);
          if (this.props.location.pathname === child[i].path) {
            //console.log("match found " + child[i].parent);
            if (currentmenu === "notset" && this.state.opendd === "") {
              currentmenu = parent;
            }
          }
          if (this.props.location.pathname === "/") {
            currentmenu = "dashboards";
          }
        }

        //console.log(currentmenu);
        //console.log(this.props.location.pathname);
        //console.log(parent);
        return <Nav>{links}</Nav>;
      }
    };

    return (
      <div className="sidebar menubar" data-color="black">
        <div className="d-flex flex-column justify-content-center">
          <div className="logo" style={{ height: "auto" }}>
            <a href="/" className="logo-mini">
              <div className="logo-img">
                {/* <img
                  src={logo}
                  height={50}
                  width={50}
                  alt="react-logo1"
                  className="dark-logo"
                /> */}
                {/* <h4
                  style={{
                    color: "#EB3143",
                    fontWeight: "700",
                    fontSize: "35px",
                    letterSpacing: "1px",
                  }}
                >
                  SCA
                </h4> */}
              </div>
            </a>
            <a className="logo-full">
              {/* <img src={LOGO} alt="react-logo" className="light-logo"/> */}
              {/* <img
                src={logodark}
                alt="react-logo2"
                height={100}
                style={{width:"Auto"}}
                className="dark-logo"
              /> */}
              <h3
                style={{
                  color: "darkblue",
                  fontWeight: "700",
                  fontSize: "30px",
                  letterSpacing: "1px",
                }}
              >
                A1 Matrimony
              </h3>
            </a>
          </div>
        </div>
        <div className="sidebar-wrapper" ref="sidebar">
          <Nav className="navigation">
            {this.props.routes.map((prop, key) => {
              if (prop.redirect) return null;
              if (prop.type === "child") return null;
              if (prop.type === "navgroup")
                return <Navmenugroup name={prop.name} key={key}></Navmenugroup>;
              if (prop.type === "dropdown")
                return (
                  <li
                    className={
                      prop.parentid +
                      " " +
                      ((prop.parentid === currentmenu &&
                        prop.parentid !== "" &&
                        prop.parentid !== "multipurpose") ||
                      this.state.opendd === prop.name
                        ? "active"
                        : null) +
                      " nav-parent "
                    }
                    data-toggle="collapse"
                    key={key}
                  >
                    <a
                      to={prop.path}
                      className="nav-link"
                      onClick={() => this.handleOpendd(prop.name)}
                    >
                      <i className={"i-" + prop.icon}></i>
                      <p>{prop.name}</p>
                      <span className="badge">{prop.badge}</span>
                      <span className={"arrow i-arrow-left"}></span>
                    </a>
                    {children(prop.child, prop.parentid)}
                  </li>
                );
              {
                console.log("prop name : ", this.state.opendd === prop);
              }
              // if (prop.type === "dropdown-backup")
              //   return (
              //     <Navmenudropdown
              //       name={prop.name}
              //       icon={prop.icon}
              //       path={prop.path}
              //       badge={prop.badge}
              //       child={prop.child}
              //       key={key}
              //       openclass={
              //         this.state.opendd === prop.name ? "activethis" : ""
              //       }
              //       onClick={() => this.handleOpendd(prop.name)}
              //     ></Navmenudropdown>
              //   );
              return (
                <li
                  className={this.activeRoute(prop.path) + " nav-parent "}
                  key={key}
                  onClick={() => this.handleOpendd(prop.name)}
                >
                  <NavLink
                    to={prop.path}
                    className="nav-link"
                    activeClassName="active"
                  >
                    <i className={"i-" + prop.icon}></i>
                    <p>{prop.name}</p>
                    <span className="badge">{prop.badge}</span>
                  </NavLink>
                </li>
              );
            })}
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
