import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, SizeOption } from '../../Hook/CartSlide';
import ProductDetailCard from '../../Component/ProductCard/ProductDetailCard';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { API_GET_PRODUCT_DETAIL } from '../../Service/MenuApi';
import { Product } from '../../Type/Product';

// Mặc định sản phẩm
const defaultProduct: Product = {
  menuItemId: 1,
  name: 'Cà phê muối',
  image: 'https://g.foolcdn.com/editorial/images/111768/coffee_cup_and_beans.jpg',
  price: 2000,
  coffeeShopId: 1,
  categoryId: 1,
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
  description: '',
  size: '',
  type: '',
  options: [],
  quantity: 0
};

const ProductDetail: React.FC = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product>(defaultProduct);
  const navigate = useNavigate();
  const { id1 } = useParams<{ id1: string}>();
  const { id, triggerNotification } = useOutletContext<{ id: string, triggerNotification: (message: string) => void }>();

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const productData = await API_GET_PRODUCT_DETAIL(id1) as unknown as Product;
        console.log(productData);
        setProduct({
          ...defaultProduct,
          ...productData,
        });
      } catch (error) {
        console.error('Error fetching product detail:', error);
      }
    };

    getProductDetail();
  }, [id]);

  const handleClick = () => {
    triggerNotification(`Product ${product.name} x ${product.quantity} has been added to cart successfully!`);
  };

  const handleSizeSelect = (size: string) => {
    if (product) {
      setProduct(prevProduct =>
        prevProduct
          ? {
              ...prevProduct,
              sizes: prevProduct.sizes?.map(s => ({
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
      setProduct(prevProduct =>
        prevProduct
          ? {
              ...prevProduct,
              iceOptions: prevProduct.iceOptions?.map(o => ({
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
      setProduct(prevProduct =>
        prevProduct ? { ...prevProduct, note } : prevProduct
      );
    }
  };

  const handleQuantityChange = (quantity: number) => {
    if (product) {
      setProduct(prevProduct =>
        prevProduct ? { ...prevProduct, quantity } : prevProduct
      );
    }
  };

  const handleAddToCart = () => {
    if (product) {
      const sizeOptions: SizeOption[] = (product.sizes || [])
        .filter(s => s.isSelected)
        .flatMap(size =>
          (product.iceOptions || [])
            .filter(o => o.isSelected)
            .map(option => ({
              size: size.size,
              option: option.option,
              quantity: product.quantity > 0 ? product.quantity : 1
            }))
        );

      dispatch(addToCart({
        productId: product.menuItemId,
        productName: product.name,
        quantity: product.quantity > 0 ? product.quantity : 1,
        sizeOptions,
        note: product.note || '',
        price: product.price,
      }));
      handleClick();
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
            onAddToCart={handleAddToCart}
            description={product.description}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
