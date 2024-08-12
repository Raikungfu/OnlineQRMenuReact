import React, { useState, useEffect } from 'react';
import CategoryCard from '../../Component/CategoryCard';
import SearchBar from '../../Component/SearchBar';
import ProductCard from '../../Component/ProductCard';
import { Category } from '../../Type/Category';
import { Product } from '../../Type/Product';
import { API_GET_CATEGORIES, API_GET_PRODUCTS } from '../../Service/Home';

interface HomeProps {
  id?: string;
}

const fakeCategories: Category[] = [
  { id: 1, name: "Espresso", image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg" },
  { id: 2, name: "Cappuccino", image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg" },
  { id: 3, name: "Espresso", image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg" },
  { id: 4, name: "Cappuccino", image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg" },
  { id: 5, name: "Espresso", image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg" },
  { id: 6, name: "Cappuccino", image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg" },
  { id: 7, name: "Espresso", image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg" },
  { id: 8, name: "Cappuccino", image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg" },
  { id: 11, name: "Espresso", image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg" },
  { id: 21, name: "Cappuccino", image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg" },
  { id: 31, name: "Espresso", image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg" },
  { id: 41, name: "Cappuccino", image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg" },
  { id: 51, name: "Espresso", image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg" },
  { id: 61, name: "Cappuccino", image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg" },
  { id: 71, name: "Espresso", image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg" },
  { id: 81, name: "Cappuccino", image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg" },
];

const fakeProducts: Product[] = [
    {
      id: 1,
      name: "Espresso Single",
      image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg",
      description: "A strong and rich espresso shot.",
      price: 2.99,
      size: "Small",
      type: "Coffee",
      coffeeShopId: 1,
      categoryId: 1,
    },
    {
      id: 2,
      name: "Cappuccino",
      image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg",
      description: "Creamy and frothy cappuccino.",
      price: 3.99,
      size: "Medium",
      type: "Coffee",
      coffeeShopId: 1,
      categoryId: 2,
    },
    {
      id: 3,
      name: "Latte",
      image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg",
      description: "Smooth and milky latte.",
      price: 4.49,
      size: "Large",
      type: "Coffee",
      coffeeShopId: 2,
      categoryId: 3,
    },
    {
        id: 4,
        name: "Espresso Single",
        image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg",
        description: "A strong and rich espresso shot.",
        price: 2.99,
        size: "Small",
        type: "Coffee",
        coffeeShopId: 1,
        categoryId: 1,
      },
      {
        id: 5,
        name: "Cappuccino",
        image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg",
        description: "Creamy and frothy cappuccino.",
        price: 3.99,
        size: "Medium",
        type: "Coffee",
        coffeeShopId: 1,
        categoryId: 2,
      },
      {
        id: 6,
        name: "Latte",
        image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg",
        description: "Smooth and milky latte.",
        price: 4.49,
        size: "Large",
        type: "Coffee",
        coffeeShopId: 2,
        categoryId: 3,
      },
      {
        id: 7,
        name: "Espresso Single",
        image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg",
        description: "A strong and rich espresso shot.",
        price: 2.99,
        size: "Small",
        type: "Coffee",
        coffeeShopId: 1,
        categoryId: 1,
      },
      {
        id: 8,
        name: "Cappuccino",
        image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg",
        description: "Creamy and frothy cappuccino.",
        price: 3.99,
        size: "Medium",
        type: "Coffee",
        coffeeShopId: 1,
        categoryId: 2,
      },
      {
        id: 9,
        name: "Latte",
        image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg",
        description: "Smooth and milky latte.",
        price: 4.49,
        size: "Large",
        type: "Coffee",
        coffeeShopId: 2,
        categoryId: 3,
      },
      {
        id: 10,
        name: "Espresso Single",
        image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg",
        description: "A strong and rich espresso shot.",
        price: 2.99,
        size: "Small",
        type: "Coffee",
        coffeeShopId: 1,
        categoryId: 1,
      },
      {
        id: 11,
        name: "Cappuccino",
        image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg",
        description: "Creamy and frothy cappuccino.",
        price: 3.99,
        size: "Medium",
        type: "Coffee",
        coffeeShopId: 1,
        categoryId: 2,
      },
      {
        id: 12,
        name: "Latte",
        image: "https://www.acouplecooks.com/wp-content/uploads/2021/08/Cafe-Au-Lait-001s.jpg",
        description: "Smooth and milky latte.",
        price: 4.49,
        size: "Large",
        type: "Coffee",
        coffeeShopId: 2,
        categoryId: 3,
      },
  ];  

  const Home: React.FC<HomeProps> = ({ id }) => {
    const [categories, setCategories] = useState<Category[]>(fakeCategories);
    const [products, setProducts] = useState<Product[]>(fakeProducts);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const categoriesData = await API_GET_CATEGORIES(id);
          const productsData = await API_GET_PRODUCTS(id);
          if (categoriesData) {
            setCategories(categoriesData as unknown as Category[]);
          }
          if (productsData) {
            setProducts(productsData as unknown as Product[]);
          }
        } catch (error) {
          console.error('Error fetching home data:', error);
        }
      };
  
      fetchData();
    }, [id]);
  
    return (
      <div className="max-w-[430px] mx-auto bg-white">
      <div className="w-full pt-24 p-4 flex flex-col">
        <div className="w-full flex flex-nowrap overflow-x-hidden hover:overflow-x-auto">
          <div className="flex space-x-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                imgSrc={category.image}
                title={category.name}
                width={100}
                height={100}
              />
            ))}
          </div>
        </div>
    
        <SearchBar />
    
        <div className="mt-2 flex-grow">
          <div className="grid grid-cols-2 gap-4">
            {products.map((product: Product) => (
              <ProductCard
                key={product.id}
                imgSrc={product.image}
                title={product.name}
                price={product.price}
                width={105}
                height={105}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
    
      );
    };
  
  export default Home;