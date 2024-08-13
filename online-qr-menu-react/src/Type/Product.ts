export interface Product {
    $id: string,
    menuItemId: number;
    name: string;
    image: string;
    description?: string;
    price: number;
    size?: string;
    type?: string;
    coffeeShopId: number;
    categoryId: number;
  }