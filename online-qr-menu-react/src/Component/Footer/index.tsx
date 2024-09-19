import React from "react";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import CartIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/WidgetsOutlined";
import { useNavigate } from "react-router-dom";

interface FooterProps {
  shopId?: string;
  tableId?: string;
}

const Footer: React.FC<FooterProps> = ({ shopId, tableId }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate(`/menu/shop/${shopId}/table/${tableId}`);
  };

  const handleCartClick = () => {
    navigate(`/menu/shop/${shopId}/table/${tableId}/cart`);
  };

  const handleMenuClick = () => {
    navigate(`/menu/shop/${shopId}/table/${tableId}/order`);
  };

  return (
    <div className="fixed z-10 bottom-0 left-0 right-0 bg-white shadow-lg p-2 flex items-center justify-center">
      <div className="flex items-center justify-between w-full max-w-screen-lg mx-4">
        <button
          className="w-10 h-10 flex items-center justify-center flex-shrink-0"
          onClick={handleHomeClick}
        >
          <HomeIcon sx={{ fontSize: 30, color: "gray" }} />
        </button>
        <button
          className="w-10 h-10 flex items-center justify-center flex-shrink-0"
          onClick={handleCartClick}
        >
          <CartIcon sx={{ fontSize: 30, color: "gray" }} />
        </button>
        <button
          className="w-10 h-10 flex items-center justify-center flex-shrink-0"
          onClick={handleMenuClick}
        >
          <MenuIcon sx={{ fontSize: 30, color: "gray" }} />
        </button>
      </div>
    </div>
  );
};

export default Footer;
