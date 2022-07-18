import { Col, Layout, Row, Spin, Tabs } from "antd";
import React from "react";
import { ProductTile } from "../../components";
import { FilterSider } from "./FilterSider/FilterSider";
import style from "./kqTimKiem.module.scss";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../queries";

const tabs = [
  {
    key: "pho-bien",
    tab: "Phổ biến",
  },
  {
    key: "ban-chay",
    tab: "Bán chạy",
  },
  {
    key: "hang-moi",
    tab: "Hàng mới",
  },
  {
    key: "gia-thap",
    tab: "Giá thấp",
  },
  {
    key: "gia-cao",
    tab: "Giá cao",
  },
];

export const KqTimKiem = () => {
  const {
    loading: list_loading,
    error: list_error,
    data: list_data,
    refetch: list_refetch,
  } = useQuery(GET_PRODUCTS, { variables: { productLock: false }, fetchPolicy: "no-cache" });

  console.log("list products", list_data, list_loading, list_error);

  return (
    <Layout className={style["container"]}>
      <FilterSider />

      <Layout.Content>
        <Tabs className={style["main"]}>
          {tabs.map((item) => (
            <Tabs.TabPane tab={item.tab} key={item.key}>
              <Spin spinning={list_loading}>
                <Row gutter={[20, 20]} className={style["main"]}>
                  {list_data?.getProducts?.map((product) => (
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
