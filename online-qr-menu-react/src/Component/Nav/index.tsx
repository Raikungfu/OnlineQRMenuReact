import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../Layout/Logo";
import NotiIcon from "@mui/icons-material/NotificationsActive";
import BackIcon from "@mui/icons-material/ArrowBackIosRounded";
import { CoffeeShop } from "../../Type/CoffeeShop";

interface NavigationBarProps {
  shopId?: string;
  tableId?: string;
  info?: CoffeeShop;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  shopId,
  tableId,
  info,
}) => {
  const location = useLocation();
  const nav = useNavigate();

  const handleBackClick = () => {
    nav(-1);
  };

  const handleClickShopAbout = () => {
    if (shopId && tableId) {
      nav(`/menu/shop/${shopId}/table/${tableId}/about`);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
      <div className="p-2 flex items-center justify-between mx-auto max-w-screen-lg">
        <div className="flex space-x-4">
          {shopId &&
            location.pathname !== `/menu/shop/${shopId}/table/${tableId}` && (
              <button
                onClick={handleBackClick}
                className="p-2 text-white rounded-full"
              >
                <BackIcon sx={{ fontSize: 24, color: "gray" }} />
              </button>
            )}
          <div
            className="flex flex-row items-center cursor-pointer"
            onClick={handleClickShopAbout}
          >
            <Logo
              src="https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg"
              alt="FPT Coffee Logo"
              width="w-12"
              height="h-12"
            />
            <div className="p-4 text-black text-xl font-medium">
              {info?.Name} - Table: {tableId}
            </div>
          </div>
        </div>
        <div className="ml-auto flex items-center">
          <div className="relative w-[35px] h-[35px] flex justify-center items-center">
            <NotiIcon sx={{ fontSize: 24, color: "gray" }} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
              <span>3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
