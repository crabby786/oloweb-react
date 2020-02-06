import Restraunts from "./Pages/Restraunts";
import RestDetails from "./Pages/RestDetails";

 const HomeRoutes = [
    {
      path: "/restraunts",
      name: "Restraunts",
      icon: 'restaurant',
      component: Restraunts,
    },
    {
        path: "/restdetail/679167",
        name: "Details",
        icon: 'my_location',
        component: RestDetails,
      },
 ]
 export default HomeRoutes