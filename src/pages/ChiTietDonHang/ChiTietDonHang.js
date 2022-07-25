import { Col, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import { GET_ORDERS } from "../../queries/order.gql";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatNumberToPrice } from "../../helpers";
import moment from "moment";

export const ChiTietDonHang = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const [order, setOrder] = useState();
  const { id } = useParams();

  const [getOrders, { loading: list_loading, error: list_error, data: list_data }] = useLazyQuery(
    GET_ORDERS,
    {
      variables: { id: id },
      fetchPolicy: "no-cache",
      onCompleted: (data) => {
        setOrder(data.getOrders[0]);
      },
    }
  );

  useEffect(() => {
    getOrders();
  }, [currentUser?.ID, getOrders]);

  console.log("get order", list_data, list_loading, list_error);
  return (
    <div>
      <Row justify="space-between" align="middle">
        <h1>Chi tiết đơn hàng</h1>

        <div>Ngày đặt hàng: {moment(order?.CREATE_AT).format("DD/MM/YYYY HH:mm")}</div>
      </Row>

      <Row gutter={20}>
        <Col span={8}>
          <h3>ĐỊA CHỈ NGƯỜI NHẬN</h3>
          <div style={{ backgroundColor: "white", padding: 20, height: "100%" }}>
            <h3>{order?.NAME}</h3>
            <div>Địa chỉ: {order?.ADDRESS}</div>
            <div>Điện thoại: {order?.PHONE_NUMBER}</div>
          </div>
        </Col>

        <Col span={8}>
          <h3>HÌNH THỨC GIAO HÀNG</h3>
          <div style={{ backgroundColor: "white", padding: 20, height: "100%" }}>
            <h3>{order?.DELIVERY_STATE}</h3>
            <div>{formatNumberToPrice(order?.PRODUCTS.reduce((p, c) => p.PRICE + c.PRICE))}đ</div>
          </div>
        </Col>

        <Col span={8}>
          <h3>HÌNH THỨC THANH TOÁN</h3>
          <div style={{ backgroundColor: "white", padding: 20, height: "100%" }}>
            <div>
              {order?.DELIVERY_METHOD === "COD"
                ? "Thanh toán tiền mặt khi nhận hàng (COD)"
                : "Thanh toán bằng Paypal"}
            </div>
          </div>
        </Col>
      </Row>

      <br />
      <br />

      {order?.PRODUCTS.map((item) => (
        <div
          style={{
            border: "1px solid #00000010",
            backgroundColor: "#fff",
            padding: 20,
          }}
          key={item.ID}
        >
          <Row gutter={20}>
            <Col flex="150px">
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                style={{
                  width: "100%",
                  aspectRatio: "1/1",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </Col>

            <Col flex="auto">
              <h3>{item.PRODUCT_NAME}</h3>
              <h3>{item.QUANTITY}</h3>
            </Col>

            <Col>{formatNumberToPrice(item.PRICE)}đ</Col>
          </Row>
        </div>
      ))}
    </div>
  );
};
