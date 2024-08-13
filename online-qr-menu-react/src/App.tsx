import { Route, Routes } from "react-router-dom";
import Home from './Page/Home';
import Landing from './Page/Landing';
import Page404 from './Page/Error/Page404';

const App = () => {
  return (
    <Routes>
      <Route path="/menu/:id" element={<Landing />}>
        <Route index element={<Home />} />
        <Route path="*" element={<Page404 />} />
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default App;