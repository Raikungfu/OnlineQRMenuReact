import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Hook/rootReducer';
import { removeFromCart, updateSizeOptionQuantity } from '../../Hook/CartSlide';
import CartSummary from '../../Component/Cart';
import CartItem from '../../Component/Cart/CartItem';
import { useNavigate, useOutletContext } from 'react-router-dom';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const items = useSelector((state: RootState) => state.cart.items);
  const { id } = useOutletContext<{ id: string }>();

  const subtotal = items.reduce((acc, item) => {
    const itemTotal = item.sizeOptions.reduce((itemAcc, sizeOption) => itemAcc + (sizeOption.quantity * item.price), 0);
    return acc + itemTotal;
  }, 0);

  const discount = 0;
  const total = subtotal - discount;

  const handleDelete = (productId: number) => {
    if (window.confirm('Are you sure you want to remove this item from the cart?')) {
      dispatch(removeFromCart(productId));
    }
  };

  const handleQuantityChange = (productId: number, size: string, option: string, quantity: number) => {
    dispatch(updateSizeOptionQuantity({ productId, size, option, quantity }));
  };

  const handleCheckout = () => {
    nav(`/menu/${id}/order`);
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
            sizeOptions={item.sizeOptions.map(option => ({
              size: option.size,
              option: option.option,
              quantity: option.quantity,
            }))}
            price={item.price}
            onDelete={() => handleDelete(item.productId)}
            onQuantityChange={(size, option, newQuantity) => handleQuantityChange(item.productId, size, option, newQuantity)}
          />
        ))}
      </div>
      <CartSummary
        subtotal={subtotal}
        discount={discount}
        total={total}
        onCheckout={handleCheckout}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default Cart;
