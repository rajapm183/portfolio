import Dashboard9 from "views/general/Dashboard/Dashboard9.jsx";
import Dashboard8 from "views/general/Dashboard/dashboard8.jsx";
import Banner from "../views/Banner/AddBanner.jsx";
import Allmembers from "../views/Members/Allmembers";
import ActiveMember from "../views/Members/ActiveMember.jsx";
import InactiveMember from "../views/Members/InactiveMember.jsx";
import BlockedMembers from "../views/Members/BlockedMembers.jsx";
import AdminProfile from "../views/AdminProfile";
import Paid from "../views/Payment/Paid";
import Unpaid from "../views/Payment/Unpaid";
import PaymentLog from "../views/Payment/PaymentLog";
import Viewads from "../views/Advertisment/Viewads.jsx";
import Createads from "../views/Advertisment/Createads.jsx";
import Viewsucc from "../views/SuccessStories/Viewsucc.jsx";
import AddMembership from "../views/MembershipPlan/AddMembership";
import EditMembershipPlan from "../views/MembershipPlan/EditMembershipPlan";
import ViewMembership from "../views/MembershipPlan/ViewMembership";
// import PushMessage from "../views/push/Pushmsg.jsx";
import Feedback from "../views/feedback/Feedback";
import Reports from "../views/Reports/Reports";
import CancelledUsers from "../views/Payment/CancelledUsers";
import { Error } from "../views/Errors/Error.jsx";
var BASEDIR = process.env.REACT_APP_BASEDIR;
var dashRoutes = [
  // {
  //   path: "/",
  //   name: "My Dashboard",
  //   icon: "grid",
  //   exact: "true",
  //   component: Dashboard9 
  // },
  {
    path: "/Dashboard",
    name: "My Dashboard",
    exact: "true",
    icon: "grid",
    component: Dashboard9,
  },
  {
    path: "/Banner",
    name: "Banner",
    icon: "picture",
    exact: "true",
    component: Banner,
  },
  {
    path: "/mplan",
    name: "Membership Plan",
    icon: "diamond",
    type: "dropdown",
    parentid: "components",
    child: [
      { path: "/addmembership", name: "Add Membership Plan" },
      // { path: "/editmembership", name: "Edit Membership Plan" },
      { path: "/viewmembership", name: "Membership Plan List" },
    ],
  },
  {
    path: "/member",
    name: "Member",
    icon: "people",
    type: "dropdown",
    parentid: "components",
    child: [
      { path: "/allmembers",name: "All Members"},
      { path: "/activemembers", name: "Active Members" },
      { path: "/inactivemembers", name: "Inactive Members" },
    ],
  },
  // {
  //   path: "/Push message",
  //   name: "Push Message",
  //   icon: "picture",
  //   exact: "true",
  //   component: PushMessage,
  // },

  {
    path: "/payments",
    name: "Payment",
    icon: "credit-card",
    type: "dropdown",
    parentid: "components",
    child: [
      { path: "/paidmembers", name: "Paid Members" },
      { path: "/unpaidmembers", name: "UnPaid Members" },
      { path: "/cancelledmembers", name: "Cancelled Members" },
      // { path: "/paymentlog", name: "Payment Log" },
    ],
  },
  {
    path: "/advertisement",
    name: "Advertisement",
    icon: "picture",
    type: "dropdown",
    parentid: "components",
    child: [
      { path: "/createads", name: "Create Advertisement" },
      { path: "/viewads", name: "View Advertisement" },
    ],
  },
  // {
  //   path: "/successstories",
  //   name: "Success Story",
  //   icon: "graph",
  //   type: "dropdown",
  //   parentid: "components",
  //   child: [{ path: "/viewsuccess", name: "View Success Story" }],
  // },
  {
    path: "/viewsuccess",
    name: "Success Story",
    icon: "graph",
    exact: "true",
    component: Viewsucc,
  },
  {
    path: "/reports",
    name: "Reports",
    exact: "true",
    icon: "flag",
    component: Reports,
  },
  {
    path: "/feedback",
    name: "Feedback",
    exact: "true",
    icon: "speech",
    component: Feedback,
  },
  { path: "/allmembers", 
  component: Allmembers,
   type: "child" },
  { path: "/activemembers", component: ActiveMember, type: "child" },
  { path: "/inactivemembers", component: InactiveMember, type: "child" },
  { path: "/blockedmembers", component: BlockedMembers, type: "child" },
  { path: "/paidmembers", component: Paid, type: "child" },
  { path: "/unpaidmembers", component: Unpaid, type: "child" },
  { path: "/paymentlog", component: PaymentLog, type: "child" },
  { path: "/cancelledmembers", component: CancelledUsers, type: "child" },
  { path: "/createads", component: Createads, type: "child" },
  { path: "/viewads", component: Viewads, type: "child" },
  // { path: "/viewsuccess", component: Viewsucc, type: "child" },
  { path: "/addmembership", component: AddMembership, type: "child" },
  { path: "/editmembership/:selectPlan/:name/:id", component: EditMembershipPlan, type: "child" },
  { path: "/viewmembership", component: ViewMembership, type: "child" },
  { path: "/dashboard1/:id", component: Dashboard8, type: "child"},
  // { path :"*" , component : Error ,type:"child"},
  { path: "/adminProfile/1", component: AdminProfile, type: "child" },
  {
    redirect: true,
    // path: BASEDIR + "/",
    pathTo: BASEDIR + "/Dashboard",
    name: "My Dashboard",
  },
  
];
export default dashRoutes;
