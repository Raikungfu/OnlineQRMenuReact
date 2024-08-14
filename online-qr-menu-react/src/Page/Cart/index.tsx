import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Hook/rootReducer';
import { removeFromCart, updateQuantity } from '../../Hook/CartSlide';
import CartSummary from '../../Component/Cart';
import CartItem from '../../Component/Cart/CartItem';
import { useNavigate, useOutletContext } from 'react-router-dom';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const items = useSelector((state: RootState) => state.cart.items);
  const { id } = useOutletContext<{ id: string }>();

  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const discount = 0;
  const total = subtotal - discount;

  const handleEdit = (productId: number) => {
    const newQuantity = prompt('Enter new quantity:');
    if (newQuantity) {
      const quantity = parseInt(newQuantity, 10);
      if (!isNaN(quantity) && quantity > 0) {
        dispatch(updateQuantity({ productId, quantity }));
      }
    }
  };

  const handleDelete = (productId: number) => {
    if (window.confirm('Are you sure you want to remove this item from the cart?')) {
      dispatch(removeFromCart(productId));
    }
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleCheckout = () => {
    nav(`/order/${id}`);
  };
  
  const handleCancel = () => {
    nav(-1);
  };
  

  return (
    <div className="w-full max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col space-y-6 p-4">
      <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
        {items.map(item => (
          <CartItem
            key={item.productId}
            productName={item.productName}
            size={item.sizes.map(size => size.size).join(', ')}
            quantity={item.quantity}
            price={item.price}
            onEdit={() => handleEdit(item.productId)}
            onDelete={() => handleDelete(item.productId)}
            onQuantityChange={(newQuantity) => handleQuantityChange(item.productId, newQuantity)}
          />
        ))}
      </div>
        <CartSummary subtotal={subtotal} discount={discount} total={total} onCheckout={handleCheckout} onCancel={handleCancel} />
    </div>
  );
};

export default Cart;
