import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart, SizeOption } from "../../Hook/CartSlide";
import ProductDetailCard from "../../Component/ProductCard/ProductDetailCard";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { API_GET_PRODUCT_DETAIL } from "../../Service/MenuApi";
import { Product } from "../../Type/Product";

const ProductDetail: React.FC = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const { shopId, tableId, triggerNotification } = useOutletContext<{
    shopId: string;
    tableId: string;
    triggerNotification: (message: string) => void;
  }>();

  useEffect(() => {
    const getProductDetail = async () => {
      try {
        const productData = (await API_GET_PRODUCT_DETAIL({
          shopId,
          productId,
        })) as unknown as Product;

        setProduct(productData);
        console.log(product);
      } catch (error) {
        console.error("Error fetching product detail:", error);
      }
    };

    getProductDetail();
  }, [shopId, tableId]);

  const handleClick = () => {
    triggerNotification(
      `Product ${product?.Name} x ${
        product && product.Quantity > 0 ? product.Quantity : 1
      } has been added to cart successfully!`
    );
  };

  const handleSelect = (groupId: number, optionId: number) => {
    if (product) {
      setProduct((prevProduct) => {
        if (!prevProduct) return prevProduct;

        const updatedGroups = prevProduct.CustomizationGroups.map((group) => {
          if (group.CustomizationGroupId === groupId) {
            return {
              ...group,
              Customizations: group.Customizations.map((option) => ({
                ...option,
                isSelected: option.MenuItemCustomizationId === optionId,
              })),
            };
          }
          return group;
        });

        return {
          ...prevProduct,
          CustomizationGroups: updatedGroups,
        };
      });
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
      console.log(quantity);
      setProduct((prevProduct) =>
        prevProduct
          ? { ...prevProduct, Quantity: quantity > 0 ? quantity : 1 }
          : prevProduct
      );
      console.log(product);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      const optionsMap: { [key: string]: number } = {};
      let totalPrice = 0;
      let totalCost = 0;

      product.CustomizationGroups.forEach((group) =>
        group.Customizations.forEach((option) => {
          if (option.isSelected) {
            if (!optionsMap[option.Name]) {
              optionsMap[option.Name] = option.AdditionalCost;
              totalPrice += option.AdditionalCost;
              totalCost += option.Cost;
            }
          }
        })
      );

      const optionsString =
        Object.keys(optionsMap).length > 0
          ? Object.keys(optionsMap).join(" - ")
          : "Default";

      const sizeOptions: SizeOption[] = [
        {
          option: optionsString,
          price: totalPrice,
          quantity: product.Quantity > 0 ? product.Quantity : 1,
          cost: totalCost,
        },
      ];

      dispatch(
        addToCart({
          productId: product.MenuItemId,
          productName: product.Name,
          quantity: product.Quantity > 0 ? product.Quantity : 1,
          sizeOptions,
          note: product.Note || "",
          price: product.Price,
          cost: product.Cost,
        })
      );

      handleClick();
      navigate(`/menu/shop/${shopId}/table/${tableId}`);
    }
  };

  return (
    <div className="w-full max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col space-y-6 p-4">
      <div className="flex flex-col md:flex-row">
        {product && (
          <ProductDetailCard
            imgSrc={product.Image}
            title={product.Name}
            description={product.Description}
            options={product.CustomizationGroups.slice(0).flatMap((group) =>
              group.Customizations.map((c) => ({
                optionId: c.MenuItemCustomizationId,
                groupId: group.CustomizationGroupId,
                option: c.Name,
                price: c.AdditionalCost,
                cost: c.Cost,
                isSelected: c.isSelected || false,
              }))
            )}
            note={product.Note}
            quantity={product.Quantity}
            onIceSelect={handleSelect}
            onNoteChange={handleNoteChange}
            onQuantityChange={handleQuantityChange}
            onAddToCart={handleAddToCart}
            CustomizationGroups={product.CustomizationGroups}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
