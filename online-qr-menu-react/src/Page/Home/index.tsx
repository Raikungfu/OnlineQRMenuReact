import React, { useState, useEffect } from 'react';
import CategoryCard from '../../Component/CategoryCard';
import SearchBar from '../../Component/SearchBar';
import ProductCard from '../../Component/ProductCard';
import { Category } from '../../Type/Category';
import { Product } from '../../Type/Product';
import { API_GET_CATEGORIES, API_GET_PRODUCTS } from '../../Service/Home';
import { useParams } from 'react-router-dom';


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

const fakeProducts: Product[] = [];  

  const Home: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [categories, setCategories] = useState<Category[]>(fakeCategories);
    const [products, setProducts] = useState<Product[]>(fakeProducts);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [productsData, categoriesData] = await Promise.all([
            API_GET_PRODUCTS({ id }),
            API_GET_CATEGORIES({ id })
          ]);
      
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
      <div className="max-w-[430px] mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col space-y-6 p-4">
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
                key={product.menuItemId}
                imgSrc={product.image}
                title={product.name}
                price={product.price}
                width={105}
                height={105} productId={product.menuItemId}
                />
            ))}
          </div>
        </div>
      </div>
      );
    };
  
  export default Home;