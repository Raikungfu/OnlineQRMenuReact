import React, { useState, useEffect } from 'react';
import Logo from '../../Component/Layout/Logo';
import Title from '../../Component/Layout/Title';
import { useParams, Outlet } from 'react-router-dom';
import { API_INFO_COFFEE_SHOP } from '../../Service/Home';
import { CoffeeShop } from '../../Type/CoffeeShop';
import Footer from '../../Component/Footer';
import NavigationBar from '../../Component/Nav';

const fakeData: CoffeeShop = {
  CoffeeShopId: 0,
  Name: "Coffee Shop",
  Location: "123 Fake Street",
  QRCode: "",
  PrimaryColor: "#000000",
  SecondaryColor: "#FFFFFF",
  Description: "This is a great coffee shop.",
  Slogan: "Best Coffee in Town!",
  Avatar: "https://th.bing.com/th/id/OIP.Xb2MJaRg3PUVdB1-h2bAHwHaHa?w=568&h=568&rs=1&pid=ImgDetMain",
  CoverImage: "path/to/default/cover.jpg",
  Hotline: "123-456-7890",
  Email: "info@coffeeshop.com",
  Website: "https://coffeeshop.com",
  Facebook: "https://facebook.com/coffeeshop",
  Instagram: "https://instagram.com/coffeeshop",
  Twitter: "https://twitter.com/coffeeshop",
  OpeningHours: "08:00 AM - 10:00 PM",
  UserId: 1,
};

const Landing: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [visible, setVisible] = useState(true);
  const [data, setData] = useState<CoffeeShop | null>(fakeData);
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
        const response = await API_INFO_COFFEE_SHOP({ id });
        if (response) {
          setData(response as unknown as CoffeeShop);
        }
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    };

    fetchData();
    
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [id]);

  if (!data) return null;
  return (
    <div className="relative flex justify-center items-center ">
    {visible && (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-[#fe562d] to-[#f58020] rounded-lg p-4 md:p-8">
      <div className="flex flex-col justify-center items-center space-y-6 md:space-y-8 text-center">
         <Logo src={data.Avatar} alt={data.Name} width="w-48 md:w-64" height="h-48 md:h-64" />
          <Title text={data.Slogan} fontSize="text-xl md:text-3xl" />
        </div>
      </div>
    )}

    <div
      className={`${visible ? 'opacity-0' : 'opacity-100'} transition-opacity justify-center items-center py-20`}
    >
      {showNotification && (
    <div className="fixed top-20 right-4 bg-orange-500 text-white p-4 rounded shadow">
      {notificationMessage}
    </div>
  )}
      <NavigationBar id={id} />
      <div className="mx-auto px-4 overflow-x-hidden">
        <div className="w-screen max-w-screen-sm mx-auto grid grid-cols-1 gap-4">
            <Outlet context={{ id, triggerNotification }} />
        </div>
      </div>

      <Footer id={id}/>
    </div>
  </div>
  );
  
};

export default Landing;