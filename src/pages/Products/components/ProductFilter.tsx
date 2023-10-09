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
    <>
      <Select
        className="w-48 mb-4"
        placeholder="Filter by Color"
        value={selectedColor}
        onChange={onChange}
        data-testid="color-filter-select"
      >
        <Option value="Black">Black</Option>
        <Option value="Stone">Stone</Option>
        <Option value="Red">Red</Option>
      </Select>
      <Button onClick={onClear}>Clear</Button>
    </>
  );
}
