import React, { useState, useEffect } from 'react';
import CategoryCard from '../../Component/CategoryCard';
import SearchBar from '../../Component/SearchBar';
import ProductCard from '../../Component/ProductCard';
import { Category } from '../../Type/Category';
import { Product } from '../../Type/Product';
import { useParams } from 'react-router-dom';
import { API_GET_MENU_BY_SHOPID } from '../../Service/MenuApi';


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

  const Home: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [categories, setCategories] = useState<Category[]>(fakeCategories);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const productsData= await 
            API_GET_MENU_BY_SHOPID(id) as unknown as {$id: string, $values: Product[] };
            setCategories(fakeCategories);
          // if (categoriesData) {
          //   setCategories(categoriesData as unknown as Category[]);
          // }

          if (productsData) {
            setProducts(productsData.$values);
          }
        } catch (error) {
          console.error('Error fetching home data:', error);
        }
      };      

       fetchData();
    }, [id]);
  
    return (
      <div className="w-full max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col space-y-6 p-4">
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