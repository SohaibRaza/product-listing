/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

jest.mock('./services/productService', () => ({
  fetchProducts: () => Promise.resolve([
    {
      id: '1',
      name: 'Sample Product 1',
      price: 10.99,
      colour: 'Black',
    },
    {
      id: '2',
      name: 'Sample Product 2',
      price: 19.99,
      colour: 'Red',
    },
  ]),
}));

describe('App', () => {
  it('renders the header', () => {
    render(<App />);
    expect(screen.getByText('Product Listing Page')).toBeInTheDocument();
  });

  it('fetches products and displays them', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Sample Product 1')).toBeInTheDocument();
      expect(screen.getByText('Sample Product 2')).toBeInTheDocument();
    });
  });
});