import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Hook/CartSlide';
import ProductDetailCard from '../../Component/ProductCard/ProductDetailCard';

const mockProduct = {
  menuItemId: 1,
  name: 'Cà phê muối',
  image: 'https://g.foolcdn.com/editorial/images/111768/coffee_cup_and_beans.jpg',
  description: 'Delicious salted coffee',
  price: 2000,
  size: '',
  type: '',
  coffeeShopId: 1,
  categoryId: 1,
  customizationGroups: [],
  orderItems: [],
  sizes: [
    { size: 'Size M', price: 1000, isSelected: true },
    { size: 'Size L', price: 2000, isSelected: false },
  ],
  iceOptions: [
    { option: '30% đá', isSelected: true },
    { option: 'ít đá', isSelected: false },
    { option: 'không đá', isSelected: false },
    { option: '50% đá', isSelected: false },
    { option: '70% đá', isSelected: false },
    { option: '100% đá', isSelected: false },
  ],
  note: '',
  quantity: 1,
};

interface MenuItem {
  menuItemId: number;
  name: string;
  image: string;
  description: string;
  price: number;
  size: string;
  type: string;
  coffeeShopId: number;
  categoryId: number;
  customizationGroups: any[];
  orderItems: any[];
  sizes: { size: string; price: number; isSelected: boolean }[];
  iceOptions: { option: string; isSelected: boolean }[];
  note: string;
  quantity: number;
}

const ProductDetail: React.FC = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState<MenuItem | null>(null);

  useEffect(() => {
    // Simulate API call with mock data
    setProduct(mockProduct);
  }, []);

  const handleSizeSelect = (size: string) => {
    if (product) {
      setProduct((prevProduct) =>
        prevProduct
          ? {
              ...prevProduct,
              sizes: prevProduct.sizes.map((s) => ({
                ...s,
                isSelected: s.size === size,
              })),
            }
          : prevProduct
      );
    }
  };

  const handleIceSelect = (option: string) => {
    if (product) {
      setProduct((prevProduct) =>
        prevProduct
          ? {
              ...prevProduct,
              iceOptions: prevProduct.iceOptions.map((o) => ({
                ...o,
                isSelected: o.option === option,
              })),
            }
          : prevProduct
      );
    }
  };

  const handleNoteChange = (note: string) => {
    if (product) {
      setProduct((prevProduct) =>
        prevProduct ? { ...prevProduct, note } : prevProduct
      );
    }
  };

  const handleQuantityChange = (quantity: number) => {
    if (product) {
      setProduct((prevProduct) =>
        prevProduct ? { ...prevProduct, quantity } : prevProduct
      );
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ productId: product.menuItemId, quantity: product.quantity }));
    }
  };

  return (    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col space-y-6">
    <div className="flex flex-col md:flex-row">
      {product && (
        <ProductDetailCard
                  imgSrc={product.image}
                  title={product.name}
                  sizes={product.sizes}
                  iceOptions={product.iceOptions}
                  note={product.note}
                  quantity={product.quantity}
                  onSizeSelect={handleSizeSelect}
                  onIceSelect={handleIceSelect}
                  onNoteChange={handleNoteChange}
                  onQuantityChange={handleQuantityChange}
                  onAddToCart={handleAddToCart} description={product.description}        />
      )}
    </div>
    </div>
  );
};

export default ProductDetail;
