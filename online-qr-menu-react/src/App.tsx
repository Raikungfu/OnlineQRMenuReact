import { Route, Routes } from "react-router-dom";
import Home from './Page/Home';
import Landing from './Page/Landing';
import Page404 from './Page/Error/Page404';
import ProductDetail from "./Page/ProductDetail";
import Cart from "./Page/Cart";
import RedirectToExternal from "./Page/Error/RedirectLink";
import Checkout from "./Page/Checkout";

const App = () => {
  return (
    <Routes>
    <Route path="/">
      <Route path="menu/:id" element={<Landing />}>
        <Route index element={<Home />} />
        <Route path="product-detail/:id1" element={<ProductDetail />} />
        <Route path="order" element={<Checkout />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<Page404 />} />
      </Route>
      <Route path="*" element={<RedirectToExternal />} />
    </Route>
  </Routes>
  );
};


export default App;