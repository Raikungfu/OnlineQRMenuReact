import HomeIcon from '@mui/icons-material/HomeOutlined';
import CartIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuIcon from '@mui/icons-material/WidgetsOutlined';

const Footer: React.FC = () => (
  <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex items-center justify-center">
    <div className="flex items-center justify-between w-full max-w-screen-lg mx-4">
      <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
        <HomeIcon sx={{ fontSize: 30, color: 'gray' }} />
      </div>
      <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
        <CartIcon sx={{ fontSize: 30, color: 'gray' }} />
      </div>
      <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
      <MenuIcon sx={{ fontSize: 30, color: 'gray' }} />
      </div>
    </div>
  </div>
);

export default Footer;