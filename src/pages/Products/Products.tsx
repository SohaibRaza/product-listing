import React, { useCallback, useEffect, useState } from "react";
import { List } from "antd";
import { fetchProducts } from "../../services/productService";
import ProductItem from "../../components/ProductCard";
import ProductFilter from "./components/ProductFilter";

export const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    let newTotalPrice = 0;
    for (const productId in cart) {
      const product = products.find((p) => p.id.toString() === productId);
      if (product) {
        newTotalPrice += product.price * cart[productId];
      }
    }
    setTotalPrice(newTotalPrice);
  }, [cart, products]);

  const handleColorChange = (value: string) => {
    setSelectedColor(value);
  };

  const updateCart = useCallback(
    (productId: string, quantityChange: number) => {
      setCart((prevCart) => {
        const updatedCart = { ...prevCart };
        if (updatedCart[productId]) {
          updatedCart[productId] += quantityChange;
          if (updatedCart[productId] === 0) {
            delete updatedCart[productId];
          }
        } else {
          updatedCart[productId] = 1;
        }
        return updatedCart;
      });
    },
    []
  );

  const handleAddToCart = (productId: string) => {
    updateCart(productId, 1);
  };

  const handleIncreaseQuantity = (productId: string) => {
    updateCart(productId, 1);
  };

  const handleDecreaseQuantity = (productId: string) => {
    updateCart(productId, -1);
  };

  const handleRemove = (productId: string) => {
    updateCart(productId, -cart[productId]);
  };

  const filteredProducts = selectedColor
    ? products.filter((product) => product.colour === selectedColor)
    : products;

  return (
    <div className="container mx-auto max-w-screen-xl overflow-x-hidden">
      <header className="App-header">
        <h1>Product Listing Page</h1>
      </header>
      <main>
        <section
          className={`min-h-screen flex flex-col ${
            totalPrice ? "mb-[144px]" : ""
          }`}
        >
          <div className="flex gap-3">
            <ProductFilter
              selectedColor={selectedColor}
              onChange={handleColorChange}
              onClear={() => setSelectedColor(null)}
            />
          </div>
          <List
            dataSource={filteredProducts}
            renderItem={(product: Record<string, any>) => (
              <List.Item className="!p-3">
                <ProductItem
                  product={product}
                  addToCart={() => handleAddToCart(product.id.toString())}
                  removeFromCart={() => handleRemove(product.id.toString())}
                  increaseQuantity={() =>
                    handleIncreaseQuantity(product.id.toString())
                  }
                  decreaseQuantity={() =>
                    handleDecreaseQuantity(product.id.toString())
                  }
                  cart={cart}
                />
              </List.Item>
            )}
          />
        </section>
      </main>

      {totalPrice > 0 && (
        <footer className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-300 shadow-top">
          <div className="container mx-auto max-w-screen-xl flex flex-col items-end">
            <h3>Total:</h3>
            <p>$ {totalPrice.toFixed(2)}</p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default ProductsPage;
