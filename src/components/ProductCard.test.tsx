import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';

const mockProduct = {
  id: '1',
  name: 'Sample Product',
  price: 10.99,
  colour: 'Red',
};

const mockCart = {
  '1': 2,
};

const mockAddToCart = jest.fn();
const mockRemoveFromCart = jest.fn();
const mockIncreaseQuantity = jest.fn();
const mockDecreaseQuantity = jest.fn();

describe('ProductCard', () => {
  it('renders product details when not in the cart', () => {
    render(
      <ProductCard
        product={mockProduct}
        addToCart={mockAddToCart}
        removeFromCart={mockRemoveFromCart}
        increaseQuantity={mockIncreaseQuantity}
        decreaseQuantity={mockDecreaseQuantity}
        cart={null}
      />
    );

    expect(screen.getByText('Sample Product')).toBeInTheDocument();
    expect(screen.getByText('Price: $10.99')).toBeInTheDocument();
    expect(screen.getByText('Colour: Red')).toBeInTheDocument();
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  it('renders product details when in the cart', () => {
    render(
      <ProductCard
        product={mockProduct}
        addToCart={mockAddToCart}
        removeFromCart={mockRemoveFromCart}
        increaseQuantity={mockIncreaseQuantity}
        decreaseQuantity={mockDecreaseQuantity}
        cart={mockCart}
      />
    );

    expect(screen.getByText('Sample Product')).toBeInTheDocument();
    expect(screen.getByText('Price: $10.99')).toBeInTheDocument();
    expect(screen.getByText('Colour: Red')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
    expect(screen.getByText('Remove')).toBeInTheDocument();
  });

  it('calls addToCart when "Add to Cart" button is clicked', () => {
    render(
      <ProductCard
        product={mockProduct}
        addToCart={mockAddToCart}
        removeFromCart={mockRemoveFromCart}
        increaseQuantity={mockIncreaseQuantity}
        decreaseQuantity={mockDecreaseQuantity}
        cart={null}
      />
    );

    fireEvent.click(screen.getByText('Add to Cart'));
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('calls removeFromCart when "Remove" button is clicked', () => {
    render(
      <ProductCard
        product={mockProduct}
        addToCart={mockAddToCart}
        removeFromCart={mockRemoveFromCart}
        increaseQuantity={mockIncreaseQuantity}
        decreaseQuantity={mockDecreaseQuantity}
        cart={mockCart}
      />
    );

    fireEvent.click(screen.getByText('Remove'));
    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockProduct);
  });

  it('calls increaseQuantity when "+" button is clicked', () => {
    render(
      <ProductCard
        product={mockProduct}
        addToCart={mockAddToCart}
        removeFromCart={mockRemoveFromCart}
        increaseQuantity={mockIncreaseQuantity}
        decreaseQuantity={mockDecreaseQuantity}
        cart={mockCart}
      />
    );

    fireEvent.click(screen.getByText('+'));
    expect(mockIncreaseQuantity).toHaveBeenCalledWith(mockProduct);
  });

  it('calls decreaseQuantity when "-" button is clicked', () => {
    render(
      <ProductCard
        product={mockProduct}
        addToCart={mockAddToCart}
        removeFromCart={mockRemoveFromCart}
        increaseQuantity={mockIncreaseQuantity}
        decreaseQuantity={mockDecreaseQuantity}
        cart={mockCart}
      />
    );

    fireEvent.click(screen.getByText('-'));
    expect(mockDecreaseQuantity).toHaveBeenCalledWith(mockProduct);
  });
});
