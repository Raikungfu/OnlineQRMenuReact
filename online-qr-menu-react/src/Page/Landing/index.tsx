import React, { useState, useEffect } from 'react';
import Logo from '../../Component/Layout/Logo';
import Title from '../../Component/Layout/Title';
import { useParams, Outlet } from 'react-router-dom';
import { API_INFO_COFFEE_SHOP } from '../../Service/Home';
import { CoffeeShop } from '../../Type/CoffeeShop';
import Footer from '../../Component/Footer';
import NavigationBar from '../../Component/Nav';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const fakeData: CoffeeShop = {
  CoffeeShopId: 0,
  Name: "Coffee Shop",
  Location: "123 Fake Street",
  QRCode: "",
  PrimaryColor: "#000000",
  SecondaryColor: "#FFFFFF",
  Description: "This is a great coffee shop.",
  Slogan: "Best Coffee in Town!",
  Avatar: "https://th.bing.com/th/id/OIP.Xb2MJaRg3PUVdB1-h2bAHwHaHa?w=568&h=568&rs=1&pid=ImgDetMain", // Thay đổi đường dẫn tới ảnh mặc định
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

    
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };

    fetchData();

  }, [id]);

  if (!data) return null;
  return (
    <div className="relative flex justify-center items-center">
      
    {visible && (
      <div className="h-screen z-1050 absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-b from-[#fe562d] to-[#f58020] rounded-lg p-4 md:p-8">
        <div className="flex flex-col justify-center items-center space-y-6 md:space-y-8">
          <Logo src={data.Avatar} alt={data.Name} width="w-48 md:w-64" height="h-48 md:h-64" />
          <Title text={data.Slogan} fontSize="text-xl md:text-3xl" />
        </div>
      </div>
    )}

    <div
      className={`${visible ? 'opacity-0' : 'opacity-100'} transition-opacity justify-center items-center h-screen`}
    >
      <NavigationBar/>
      <Outlet />
      <Footer/>
    </div>
  </div>

  
  );
  
};

export default Landing;