import { Col, Layout, Row, Spin, Tabs } from "antd";
import React, { useEffect } from "react";
import { ProductTile } from "../../components";
import { FilterSider } from "./FilterSider/FilterSider";
import style from "./kqTimKiem.module.scss";
import { useLazyQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../queries";
import { useQueryParams } from "../../hooks";
import { keys } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../ducks/slices/productSlice";

const tabs = {
  default: { value: { field: null, type: null }, title: "Tất cả" },
  price_l_2_h: { value: { field: "PRICE", type: "asc" }, title: "Giá thấp - cao" },
  price_h_2_l: { value: { field: "PRICE", type: "desc" }, title: "Giá cao - thấp" },
  a_z: { value: { field: "PRODUCT_NAME", type: "asc" }, title: "A - Z" },
  z_a: { value: { field: "PRODUCT_NAME", type: "desc" }, title: "Z - A" },
};

export const KqTimKiem = () => {
  const query = useQueryParams();

  const name = query.get(keys.SEARCH_NAME);
  const category = query.get(keys.SEARCH_CATEGORY);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [getProducts, { loading: list_loading, error: list_error, data: list_data }] = useLazyQuery(
    GET_PRODUCTS,
    {
      onCompleted: (data) => {
        dispatch(updateProduct({ loading: false, list: data?.getProducts }));
      },
    }
  );

  console.log("list products", list_data, list_loading, list_error);

  useEffect(() => {
    console.log("query", category, name);
    getProducts({
      variables: {
        productLock: false,
        categoriesId: category,
        searchString: name,
        orderBy: tabs.default.value,
      },
      fetchPolicy: "no-cache",
    });
    dispatch(updateProduct({ loading: true, list: [] }));
  }, [category, dispatch, getProducts, name]);

  const handleChangeTab = (value) => {
    console.log();
    getProducts({
      variables: {
        productLock: false,
        categoriesId: category,
        searchString: name,
        orderBy: JSON.parse(value),
      },
      fetchPolicy: "no-cache",
    });
    dispatch(updateProduct({ loading: true, list: [] }));
  };

  return (
    <Layout className={style["container"]}>
      <FilterSider />

      <Layout.Content>
        <Tabs className={style["main"]} onChange={handleChangeTab}>
          {Object.keys(tabs).map((key) => (
            <Tabs.TabPane tab={tabs[key].title} key={JSON.stringify(tabs[key].value)}>
              <Spin spinning={list_loading}>
                <Row gutter={[20, 20]} className={style["main"]}>
                  {product.list.map((product) => (
                    <Col span={6} key={product.ID}>
                      <ProductTile product={product} />
                    </Col>
                  ))}
                </Row>
              </Spin>
            </Tabs.TabPane>
          ))}
        </Tabs>
      </Layout.Content>
    </Layout>
  );
};
