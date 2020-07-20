import Restaurants from "./Pages/Restaurants";
// import RestDetails from "./Pages/RestDetails";
import Dashboard from "./Pages/Dashboard";
import OloHome from "./Pages/comps/Olo_home";
import MerchantList from "./Pages/MerchantLogin/MerchantList";
import HomePage from "./Pages/Home";
import TopTen from "./Pages/TopDishes/topTen";
import SubAccountList from "./Pages/MerchantLogin/SubAccountList";
import RestaurantServices from "./Pages/MerchantLogin/Services";
import TableBook from "./Pages/BookTable/TableBook";
import Checkout from "./Pages/Checkout";
import ThanksPage from "./Pages/thanku";
import MealTab from "./Components/custom/meal_tab";
import OrderStatusPage from "./Pages/comps/order_status";
  export const HomeRoutes = [
    {
      path: "/restaurants",
      name: "Restaurants",
      icon: 'restaurant',
      component: Restaurants,
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
        path: "/checkout",
        name: "Checkout",
        icon: 'perm_phone_msg',
        component: Checkout,
      },
    {
      path: "/order_place",
      name: "Thank You",
      icon: 'perm_phone_msg',
      component: ThanksPage,
    },
    {
      path: "/order_status",
      name: "Order Status",
      icon: 'perm_phone_msg',
      component: OrderStatusPage,
    },
    {
      path: "/restdetail/:id",
      name: "Restaurants",
      icon: 'games',
      component: MealTab ,
    },
    {
      path: "/Contact",
      name: "Contact",
      icon: 'perm_phone_msg',
      component: null,
      href: "https://shawmansoftware.com/contact-us/"
    },
    {
      path: "/",
      name: "Home",
      icon: 'album',
      component: OloHome,
    },
 ]
 export const RootRoutes = [
  {
    path: "/merchants/:merchantId/:RestaurantId",
    name: "sub account",
    icon: 'recent_actors',
    component: RestaurantServices,
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
  },,
  {
    path: "/",
    name: "Home",
    icon: 'album',
    component: HomePage,
  },
]
