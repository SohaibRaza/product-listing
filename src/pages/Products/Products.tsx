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
  const [totalItems, setTotalItems] = useState(0);

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

  useEffect(() => {
    let newTotalItems = 0;

    for (const quantity of Object.values(cart)) {
      newTotalItems += quantity;
    }

    setTotalItems(newTotalItems);
  }, [cart]);

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
      <div className="px-3">
        <header className="App-header">
          <h1>Product Listing</h1>
        </header>
        <div className="flex gap-3">
          <ProductFilter
            selectedColor={selectedColor}
            onChange={handleColorChange}
            onClear={() => setSelectedColor(null)}
          />
        </div>
      </div>
      <main>
        <section
          className={`min-h-screen flex flex-col ${
            totalPrice ? "mb-[160px]" : ""
          }`}
        >
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
        <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 py-0 2xs:py-4 border-t border-gray-300 shadow-top">
          <div className="container mx-auto max-w-screen-xl flex flex-col items-center">
            <h3 className="mb-2">Total:</h3>
            <table>
              <tbody>
                <tr>
                  <td className="p-1">Items:</td>
                  <td className="p-1">{totalItems}</td>
                </tr>
                <tr>
                  <td className="p-1">Price:</td>
                  <td className="p-1">${totalPrice.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </footer>
      )}
    </div>
  );
};

export default ProductsPage;
