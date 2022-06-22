import { Col, Row } from "antd";
import React from "react";
import OrderTile from "../QuanLyDonHang/OrderTile/OrderTile";

export const ChiTietDonHang = () => {
  return (
    <div>
      <Row justify="space-between" align="middle">
        <h1>Chi tiết đơn hàng</h1>

        <div>Ngày đặt hàng: 21:20 20/06/2022</div>
      </Row>

      <Row gutter={20}>
        <Col span={8}>
          <h3>ĐỊA CHỈ NGƯỜI NHẬN</h3>
          <div
            style={{ backgroundColor: "white", padding: 20, height: "100%" }}
          >
            <h3>Nguyen Van A</h3>
            <div>
              Địa chỉ: Lô 22, số 35 Lê Văn Thiêm, Phường Thanh Xuân Trung, Quận
              Thanh Xuân, Hà Nội, Việt Nam
            </div>
            <div>Điện thoại: 0902223120</div>
          </div>
        </Col>

        <Col span={8}>
          <h3>HÌNH THỨC GIAO HÀNG</h3>
          <div
            style={{ backgroundColor: "white", padding: 20, height: "100%" }}
          >
            <h3>Giao hàng tiết kiệm</h3>
            <div>Giao vào Thứ năm, 23/06</div>
            <div>Được giao bởi TFootball Thế Giới Bóng Đá</div>
            <div>Miễn phí vận chuyển</div>
          </div>
        </Col>

        <Col span={8}>
          <h3>HÌNH THỨC THANH TOÁN</h3>
          <div
            style={{ backgroundColor: "white", padding: 20, height: "100%" }}
          >
            <div>Thanh toán bằng thẻ quốc tế Visa, Master, JCB</div>
          </div>
        </Col>
      </Row>

      <br />
      <br />

      <OrderTile showFooter={false} />
    </div>
  );
};
