import { Route, Routes } from "react-router";
import ShoppingList from "./component/shoppingList/ShoppingList";
import Shop from "./component/shop/Shop";

const Router = () => {
  return (
    <Routes>
      <Route index element={<ShoppingList />} />
      <Route path="shop" element={<Shop />} />
    </Routes>
  );
};

export default Router;
