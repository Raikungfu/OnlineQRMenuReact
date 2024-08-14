import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Hook/CartSlide';
import ProductDetailCard from '../../Component/ProductCard/ProductDetailCard';
import { useNavigate, useOutletContext } from 'react-router-dom';

const mockProduct = {
    productId: 1,
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

interface Product {
    productId: number;
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
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const { id } = useOutletContext<{ id: string }>();

  useEffect(() => {
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
      dispatch(addToCart({
        productId: product.productId,
        productName: product.name,
        quantity: product.quantity,
        sizes: product.sizes.filter(s => s.isSelected),
        iceOptions: product.iceOptions.filter(o => o.isSelected),
        note: product.note,
        price: product.price
      }));
      navigate(`/menu/${id}`);
    }
  };
  

  return (    
    <div className="w-full max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col space-y-6 p-4">
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
