import { SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Button, Input, Row } from "antd";
import React from "react";

export const SearchProduct = () => {
  const options = [
    {
      label: "Kết quả tìm kiếm",
      options: [
        {
          value: "xxx",
        },
      ],
    },
  ];

  const handleSelect = (value) => {
    console.log("[info] select result returned:", value);
  };

  const handleSearch = (value) => {
    console.log("[info] live search product:", value);
  };

  return (
    <Row wrap={false}>
      <AutoComplete
        style={{ width: "100%" }}
        options={options}
        onSelect={handleSelect}
        onSearch={handleSearch}
        allowClear
      >
        <Input
          size="large"
          placeholder="Tìm kiếm sản phẩm ..."
          style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
        />
      </AutoComplete>

      <Button
        size="large"
        icon={<SearchOutlined />}
        type="primary"
        style={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }}
      >
        Tìm kiếm
      </Button>
    </Row>
  );
};
