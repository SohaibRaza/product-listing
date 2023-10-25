import { Card, Button } from "antd";
import React from "react";

interface ProductItemProps {
  product: Record<string, any>;
  addToCart: (product: Record<string, any>) => void;
  removeFromCart: (product: Record<string, any>) => void;
  increaseQuantity: (product: Record<string, any>) => void;
  decreaseQuantity: (product: Record<string, any>) => void;
  cart: Record<string, number> | null;
}

const ProductItem: React.FC<ProductItemProps> = ({
  addToCart,
  product,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  cart,
}) => {
  return (
    <Card className="w-full bg-gray-800 border-neutral-800 text-white" hoverable>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-8 dark:bg-black">
        <div className="flex flex-col 2xs:flex-row items-center 2xs:items-start gap-4">
          <div className="">
            <img
              alt={product.name}
              src={`https://picsum.photos/200/300?random=${product.id}`}
              style={{ maxHeight: "200px" }}
            />
          </div>
          <div className="">
            <h3>{product.name}</h3>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p className="underline">Colour: {product.colour}</p>
          </div>
        </div>
        <div>
          {!cart || !cart[product.id] ? (
            <Button type="primary" onClick={() => addToCart(product)}>
              Add to Cart
            </Button>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div>
                <Button
                  type="default"
                  onClick={() => decreaseQuantity(product)}
                >
                  -
                </Button>
                <span style={{ margin: "0 8px" }}>{cart[product.id]}</span>
                <Button
                  type="default"
                  onClick={() => increaseQuantity(product)}
                >
                  +
                </Button>
              </div>
              <div>
                <Button
                  danger
                  type="default"
                  onClick={() => removeFromCart(product)}
                >
                  Remove
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProductItem;
