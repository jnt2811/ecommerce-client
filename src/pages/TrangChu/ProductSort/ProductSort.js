import { useLazyQuery } from "@apollo/client";
import { nanoid } from "@reduxjs/toolkit";
import { Select, Space } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../../ducks/slices/productSlice";
import { GET_PRODUCTS } from "../../../queries";

const sorts = {
  default: { value: { field: null, type: null }, title: "Mặc định" },
  price_l_2_h: { value: { field: "PRICE", type: "asc" }, title: "Giá thấp - cao" },
  price_h_2_l: { value: { field: "PRICE", type: "desc" }, title: "Giá cao - thấp" },
  a_z: { value: { field: "PRODUCT_NAME", type: "asc" }, title: "A - Z" },
  z_a: { value: { field: "PRODUCT_NAME", type: "desc" }, title: "Z - A" },
};

export const ProductSort = () => {
  const [getProducts, { loading: list_loading, error: list_error, data: list_data }] =
    useLazyQuery(GET_PRODUCTS);
  const dispatch = useDispatch();

  console.log("list products", list_data, list_loading, list_error);

  const handleChange = (value) => {
    const parsedValue = JSON.parse(value);
    getProducts({
      variables: { productLock: false, orderBy: parsedValue },
      fetchPolicy: "no-cache",
    });
    dispatch(updateProduct({ loading: true }));
  };

  useEffect(() => {
    if (list_data) {
      dispatch(updateProduct({ loading: false, list: list_data.getProducts }));
    }
  }, [dispatch, list_data]);

  return (
    <Space>
      <div>Sắp xếp</div>

      <Select
        style={{ width: 200 }}
        defaultValue={JSON.stringify(sorts.default.value)}
        onChange={handleChange}
      >
        {Object.values(sorts).map((item) => (
          <Select.Option key={nanoid(5)} value={JSON.stringify(item.value)}>
            {item.title}
          </Select.Option>
        ))}
      </Select>
    </Space>
  );
};
