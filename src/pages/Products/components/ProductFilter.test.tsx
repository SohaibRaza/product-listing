/* eslint-disable testing-library/prefer-screen-queries */
import { render, fireEvent, screen } from "@testing-library/react";
import ProductFilter from "./ProductFilter";

describe("ProductFilter", () => {
  const mockOnChange = jest.fn();
  const mockOnClear = jest.fn();

  const renderComponent = (selectedColor: any) => {
    return render(
      <ProductFilter
        selectedColor={selectedColor}
        onChange={mockOnChange}
        onClear={mockOnClear}
      />
    );
  };

  const selectedColor = "Black";

  it("renders the component with the selected color", () => {
    const { getByTestId } = render(
      <ProductFilter
        selectedColor={selectedColor}
        onChange={() => {}}
        onClear={() => {}}
      />
    );

    const colorFilterSelect = getByTestId("color-filter-select");

    expect(colorFilterSelect).toHaveTextContent(selectedColor);
  });

  it("calls the onClear function when the 'Clear' button is clicked", () => {
    const { getByText } = renderComponent("Black");

    const clearButton = getByText("Clear");
    fireEvent.click(clearButton);

    expect(mockOnClear).toHaveBeenCalled();
  });
});
