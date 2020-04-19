import Restraunts from "./Pages/Restraunts";
import RestDetails from "./Pages/RestDetails";
import Dashboard from "./Pages/Dashboard";
import OloHome from "./Pages/Olo_home";
import MerchantList from "./Pages/MerchantLogin/MerchantList";
import HomePage from "./Pages/Home";
import TopTen from "./Pages/TopDishes/topTen";
import SubAccountList from "./Pages/MerchantLogin/SubAccountList";
import RestrauntServices from "./Pages/MerchantLogin/Services";
import TableBook from "./Pages/BookTable/TableBook";
  export const HomeRoutes = [
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
    {
        path: "/top10",
        name: "Top 10 Dishes",
        icon: 'restaurant',
        component: TopTen,
      },
    {
        path: "/book_table",
        name: "Book Table",
        icon: 'restaurant',
        component: TableBook,
      },
    {
      path: "/",
      name: "Dashboard",
      icon: 'art_track',
      component: Dashboard,
      
    },
 ]
  export const NavRoutes = [
    {
      path: "/restraunts",
      name: "Restraunts",
      icon: 'restaurant',
      component: OloHome,
    },
    {
        path: "/top10",
        name: "Top Dishes",
        icon: 'album',
        component: TopTen,
      },
    {
        path: "/book_table",
        name: "About Us",
        icon: 'games',
        component: TableBook,
      },
    {
      path: "/",
      name: "Contact",
      icon: 'perm_phone_msg',
      component: OloHome,
      
    },
 ]
 export const RootRoutes = [
  {
    path: "/home",
    name: "Home",
    icon: 'art_track',
    component: HomePage,
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
  {
    path: "/merchants",
    name: "Merchant Login",
    icon: 'recent_actors',
    component: MerchantList,
    exact:true
  },
]
