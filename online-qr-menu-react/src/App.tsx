import { Route, Routes } from "react-router-dom";
import Home from './Page/Home';
import Landing from './Page/Landing';
import Page404 from './Page/Error/Page404';
import ProductDetail from "./Page/ProductDetail";
import Cart from "./Page/Cart";

const App = () => {
  return (
    <Routes>
      <Route path="/menu/:id" element={<Landing />}>
        <Route index element={<Home />} />
        <Route path="product-detail/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};


export default App;