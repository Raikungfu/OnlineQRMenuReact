import { Route, Routes } from "react-router-dom";
import Home from "./Page/Home";
import Landing from "./Page/Landing";
import Page404 from "./Page/Error/Page404";
import ProductDetail from "./Page/ProductDetail";
import Cart from "./Page/Cart";
import RedirectToExternal from "./Page/Error/RedirectLink";
import Checkout from "./Page/Checkout";
import OrderDetail from "./Page/OrderDetail";
import OrderList from "./Page/Order";
import CoffeeShopAbout from "./Page/About";

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="menu/shop/:shopId/table/:tableId" element={<Landing />}>
          <Route index element={<Home />} />
          <Route path="product-detail/:productId" element={<ProductDetail />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order" element={<OrderList />} />
          <Route path="order-detail/:orderId" element={<OrderDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="about" element={<CoffeeShopAbout />} />
          <Route path="setting" element={<Cart />} />
          <Route path="*" element={<Page404 />} />
        </Route>
        <Route path="*" element={<RedirectToExternal />} />
      </Route>
    </Routes>
  );
};

export default App;
