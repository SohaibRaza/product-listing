import { Button, Select } from "antd";
import React from "react";

const { Option } = Select;

interface ProductFilterProps {
  selectedColor: string | null;
  onChange: (value: string) => void;
  onClear: () => void;
}

export default function ProductFilter({
  selectedColor,
  onChange,
  onClear,
}: ProductFilterProps) {
  return (
    <div className="flex flex-col 2xs:flex-row 2xs:items-center gap-3 mb-4">
      <label htmlFor="filter-by-color">Filter by Color</label>
      <Select
        className="w-48"
        id="filter-by-color"
        placeholder="Select Color"
        value={selectedColor}
        onChange={onChange}
        data-testid="color-filter-select"
      >
        <Option value={""} default>
          All
        </Option>
        <Option value="Black">Black</Option>
        <Option value="Stone">Stone</Option>
        <Option value="Red">Red</Option>
      </Select>
    </div>
  );
}
