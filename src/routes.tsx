import Restraunts from "./Pages/Restraunts";
import RestDetails from "./Pages/RestDetails";
import Dashboard from "./Pages/Dashboard";
import MerchantList from "./Pages/MerchantLogin/MerchantList";
import HomePage from "./Pages/Home";
import SubAccountList from "./Pages/MerchantLogin/SubAccountList";
import RestrauntServices from "./Pages/MerchantLogin/Services";
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
    exact:true
  },

  {
    path: "/merchants/:merchantId/:RestaurantId",
    name: "sub account",
    icon: 'recent_actors',
    component: RestrauntServices,
  },
  {
    path: "/merchants/:merchantId",
    name: "sub account",
    icon: 'recent_actors',
    component: SubAccountList,
  },
]
