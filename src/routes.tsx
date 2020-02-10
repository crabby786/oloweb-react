import Restraunts from "./Pages/Restraunts";
import RestDetails from "./Pages/RestDetails";
import Dashboard from "./Pages/Dashboard";
import MerchantList from "./Pages/MerchantList";
import HomePage from "./Pages/Home";

  export const HomeRoutes = [
    {
      path: "/",
      name: "Dashboard",
      icon: 'art_track',
      component: Dashboard,
      exact:true
    },
    {
      path: "/restraunts",
      name: "Restraunts",
      icon: 'restaurant',
      component: Restraunts,
    },
    {
        path: "/restdetail/:restid",
        name: "Details",
        icon: 'my_location',
        component: RestDetails,
      },
 ]
 export const RootRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: 'art_track',
    component: HomePage,
  },
  {
    path: "/merchants",
    name: "Merchant Login",
    icon: 'recent_actors',
    component: MerchantList,
  },
]
