import React, { useState, useEffect } from "react";
import CategoryCard from "../../Component/CategoryCard";
import SearchBar from "../../Component/SearchBar";
import ProductCard from "../../Component/ProductCard";
import { Category } from "../../Type/Category";
import { Product } from "../../Type/Product";
import { useParams } from "react-router-dom";
import {
  API_GET_CATEGORIES_BY_SHOPID,
  API_GET_MENU_BY_SHOPID,
} from "../../Service/MenuApi";

const Home: React.FC = () => {
  const { shopId } = useParams<{ shopId: string }>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          API_GET_MENU_BY_SHOPID({ shopId }),
          API_GET_CATEGORIES_BY_SHOPID(shopId),
        ]);

        if (categoriesData) {
          var categories = categoriesData as unknown as Category[];

          setCategories(
            categories.map((category) => ({
              ...category,
              isSelected: category.isSelected ?? false,
            }))
          );
        }

        if (productsData) {
          var products = productsData as unknown as Product[];
          setProducts(products);
        }
      } catch (error) {
        console.error("Error fetching home data:", error);
      }
    };

    fetchData();
  }, [shopId]);

  const selectCategory = async (categoryId?: number, isSelected?: boolean) => {
    try {
      const productsData = await API_GET_MENU_BY_SHOPID({
        shopId,
        categoryId: isSelected ? null : categoryId,
      });

      setCategories((prevCategories) =>
        prevCategories.map((category) => ({
          ...category,
          isSelected:
            category.CategoryId === categoryId ? !category.isSelected : false,
        }))
      );

      if (productsData) {
        var products = productsData as unknown as Product[];
        setProducts(products);
      }
    } catch (error) {
      console.error("Error fetching home data:", error);
    }
  };

  return (
    <div className="w-full max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col space-y-6 p-4">
      <div className="w-full flex flex-nowrap hidden-scroll-bar">
        <div className="flex space-x-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.CategoryId}
              imgSrc={category.Image}
              name={category.Name}
              description={category.Description}
              height={100}
              isSelected={category.isSelected}
              selectCategory={() =>
                selectCategory(category.CategoryId, category.isSelected)
              }
            />
          ))}
        </div>
      </div>

      <SearchBar />

      <div className="mt-2 flex-grow">
        <div className="grid grid-cols-2 gap-4">
          {products.map((product: Product) => (
            <ProductCard
              key={product.MenuItemId}
              imgSrc={product.Image}
              name={product.Name}
              description={product.Description}
              price={product.Price}
              width={105}
              height={105}
              productId={product.MenuItemId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
