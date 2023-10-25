/* eslint-disable testing-library/prefer-screen-queries */
import { render } from "@testing-library/react";
import ProductFilter from "./ProductFilter";

describe("ProductFilter", () => {
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
});
