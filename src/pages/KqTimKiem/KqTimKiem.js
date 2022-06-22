import { Col, Row, Tabs } from "antd";
import React from "react";
import { ProductTile } from "../../components";
import { FilterSider } from "./FilterSider/FilterSider";
import style from "./kqTimKiem.module.scss";

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
  return (
    <div className={style["container"]}>
      <FilterSider />

      <Tabs className={style["main"]}>
        {tabs.map((item) => (
          <Tabs.TabPane tab={item.tab} key={item.key}>
            <Row gutter={[20, 20]} className={style["main"]}>
              <Col span={6}>
                <ProductTile />
              </Col>
              <Col span={6}>
                <ProductTile />
              </Col>
              <Col span={6}>
                <ProductTile />
              </Col>
              <Col span={6}>
                <ProductTile />
              </Col>
              <Col span={6}>
                <ProductTile />
              </Col>
              <Col span={6}>
                <ProductTile />
              </Col>
            </Row>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};
