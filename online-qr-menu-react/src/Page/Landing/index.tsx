import React, { useState, useEffect } from "react";
import Logo from "../../Component/Layout/Logo";
import Title from "../../Component/Layout/Title";
import { useParams, Outlet } from "react-router-dom";
import { API_INFO_COFFEE_SHOP } from "../../Service/Home";
import { CoffeeShop } from "../../Type/CoffeeShop";
import Footer from "../../Component/Footer";
import NavigationBar from "../../Component/Nav";
import OrderStatusComponent from "../../Component/OrderStatus";

const Landing: React.FC = () => {
  const { shopId, tableId } = useParams<{ shopId: string; tableId: string }>();

  const [visible, setVisible] = useState(true);
  const [infoShop, setInfoShop] = useState<CoffeeShop | null>();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const triggerNotification = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API_INFO_COFFEE_SHOP(shopId);
        if (response) {
          setInfoShop(response as unknown as CoffeeShop);
        }
      } catch (error) {
        console.error("Error fetching home data:", error);
      }
    };

    fetchData();

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [shopId]);

  if (!infoShop) return null;
  return (
    <div className="relative flex justify-center items-center ">
      {visible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-[#fe562d] to-[#f58020] rounded-lg p-4 md:p-8">
          <div className="flex flex-col justify-center items-center space-y-6 md:space-y-8 text-center">
            <Logo
              src={infoShop.Avatar}
              alt={infoShop.Name}
              width="w-48 md:w-64"
              height="h-48 md:h-64"
            />
            <Title text={infoShop.Slogan} fontSize="text-xl md:text-3xl" />
          </div>
        </div>
      )}

      <OrderStatusComponent shopId={shopId} tableId={tableId} />
      <div
        className={`${
          visible ? "opacity-0" : "opacity-100"
        } transition-opacity justify-center items-center py-20`}
      >
        {showNotification && (
          <div className="fixed top-20 right-4 bg-orange-500 text-white p-4 rounded shadow">
            {notificationMessage}
          </div>
        )}
        <NavigationBar shopId={shopId} tableId={tableId} info={infoShop} />
        <div className="mx-auto px-4 overflow-x-hidden">
          <div className="w-screen max-w-screen-sm mx-auto grid grid-cols-1 gap-4">
            <Outlet
              context={{ shopId, tableId, triggerNotification, infoShop }}
            />
          </div>
        </div>

        <Footer shopId={shopId} tableId={tableId} />
      </div>
    </div>
  );
};

export default Landing;
