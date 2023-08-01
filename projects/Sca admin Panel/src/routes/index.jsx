import GeneralLayout from "layouts/General.jsx";
// import Banner from '../views/Banner/BannerList'
import BlankPage from "layouts/BlankPage.jsx";
import LoginPage from "../views/Log-InOut.jsx";

const token = localStorage.getItem("AuthId");
// console.log("token:",token)
var indexRoutes = token
  ? [
      { path: "/", name: "Home", component: GeneralLayout },
      // { path: "/banner", name: "Banner", component:Banner },
      // {path: "*", pathTo:"/404", component: BlankPage },
      // { path: "*", component: BlankPage },
    ]
  : [
      { path: "/login", name: "Login", component: LoginPage },
      { path: "/register", name: "Register", component: LoginPage },

      { path: "/lockscreen", name: "Lockscreen", component: BlankPage },
      { path: "/403", name: "403", component: BlankPage },
      { path: "/404", name: "404", component: BlankPage },
      { path: "/405", name: "405", component: BlankPage },
      { path: "/408", name: "408", component: BlankPage },
      { path: "/500", name: "500", component: BlankPage },
      { path: "/503", name: "503", component: BlankPage },
      { path: "/offline", name: "Offline", component: BlankPage },

      { redirect: true, path: "/", pathTo: "/login", component: LoginPage },
    ];
export default indexRoutes;
