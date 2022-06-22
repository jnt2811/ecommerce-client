import { Col, Row, Tabs } from "antd";
import React from "react";
import OrderTile from "./OrderTile/OrderTile";

const tabs = [
  {
    key: "tat-ca-don",
    tab: "Tất cả đơn",
  },
  {
    key: "cho-thanh-toan",
    tab: "Chờ thanh toán",
  },
  {
    key: "dang-xu-ly",
    tab: "Đang xử lý",
  },
  {
    key: "dang-van-chuyen",
    tab: "Đang vận chuyển",
  },
  {
    key: "da-giao",
    tab: "Đã giao",
  },
  {
    key: "da-huy",
    tab: "Đã huỷ",
  },
];

export const QuanLyDonHang = () => {
  return (
    <div>
      <Tabs>
        {tabs.map((item) => (
          <Tabs.TabPane tab={item.tab} key={item.key}>
            <OrderTile />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};
