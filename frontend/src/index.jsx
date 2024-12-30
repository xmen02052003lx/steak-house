import React from "react"
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"
// import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/styles/bootstrap.custom.css"
import "react-datepicker/dist/react-datepicker.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import ManagerRoute from "./components/ManagerRoute"
import PaymentScreen from "./screens/PaymentScreen"
import ProductScreen from "./screens/ProductScreen"
import HomeScreen from "./screens/HomeScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import PrivateRoute from "./components/PrivateRoute"
import RestaurantInfoEditScreen from "./screens/admin/RestaurantInfoEditScreen"
import { HelmetProvider } from "react-helmet-async"
import OrderScreen from "./screens/OrderScreen"
import PlaceOrderScreen from "./screens/PlaceOrderScreen"
import MenuCreateScreen from "./screens/admin/MenuCreateScreen"
import BookingScreen from "./screens/BookingScreen"
import ThucDonScreen from "./screens/ThucDonScreen"
import TableListScreen from "./screens/admin/TableListScreen"
import BookingListScreen from "./screens/admin/BookingListScreen"
import MenuList from "./screens/admin/MenuList"
import MenuEditScreen from "./screens/admin/MenuEditScreen"
import OrderListScreen from "./screens/admin/OrderListScreen"
import OrderDetailScreen from "./screens/admin/OrderDetailScreen"
import UserListScreen from "./screens/admin/UserListScreen"
import UserEditScreen from "./screens/admin/UserEditScreen"
import DeliveryScreen from "./screens/DeliveryScreen"
import ShippingScreen from "./screens/ShippingScreen"
import ProfileScreen from "./screens/ProfileScreen"
import EatInOrderScreen from "./screens/EatInOrderScreen"
import EatinPlaceOrder from "./screens/EatinPlaceOrder"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/menu/:checkinUrl" element={<OrderScreen />} />
      <Route path="/thucdon" element={<ThucDonScreen />} />
      <Route path="/booking" element={<BookingScreen />} />
      <Route path="/dathang" element={<DeliveryScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/eatin/tables/:id" element={<EatInOrderScreen />} />
      {/* Registered users */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/eatin/placeorder/:id" element={<EatinPlaceOrder />} />
      </Route>
      {/* Manager users */}
      <Route path="" element={<ManagerRoute />}>
        <Route
          path="/manager/restaurant"
          element={<RestaurantInfoEditScreen />}
        />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
        <Route path="/manager/userlist" element={<UserListScreen />} />
        <Route path="/manager/createmenu" element={<MenuCreateScreen />} />
        <Route path="/manager/tablelist" element={<TableListScreen />} />
        <Route path="/manager/bookingslist" element={<BookingListScreen />} />
        <Route path="/manager/menu" element={<MenuList />} />
        <Route path="/manager/:id/edit" element={<MenuEditScreen />} />
        <Route path="/manager/orderlist" element={<OrderListScreen />} />
        <Route path="/manager/bill/:id" element={<OrderDetailScreen />} />
      </Route>
      {/* Employee users */}
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
)

reportWebVitals()
