import { Select, Space } from "antd";
import React from "react";

const sorts = {
  default: { value: "default", title: "Mặc định" },
  hot: { value: "hot", title: "Bán chạy" },
  price_l_2_h: { value: "price_l_2_h", title: "Giá thấp - cao" },
  price_h_2_l: { value: "price_h_2_l", title: "Giá cao - thấp" },
  a_z: { value: "desc", title: "A - Z" },
  z_a: { value: "asc", title: "Z - A" },
};

export const ProductSort = () => {
  return (
    <Space>
      <div>Sắp xếp</div>

      <Select style={{ width: 200 }} defaultValue={sorts.default.value}>
        {Object.values(sorts).map((item) => (
          <Select.Option key={item.value} value={item.value}>
            {item.title}
          </Select.Option>
        ))}
      </Select>
    </Space>
  );
};
