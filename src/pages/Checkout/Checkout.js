import { TagOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Radio, Row, Space } from "antd";
import style from "./checkout.module.scss";

export const Checkout = () => {
  return (
    <div>
      <Row gutter={20}>
        <Col flex="auto">
          <div className={style["block"]}>
            <h3>Đơn hàng</h3>

            <div className={style["wrapper"]}>
              <Row justify="space-between">
                <Col>
                  <div>12 Quy Luật Cuộc Đời: Thần Dược Cho Cuộc Sống Hiện Đại</div>
                  <div>SL: x1</div>
                </Col>
                <Col>186.000 đ</Col>
              </Row>
              <Divider />
              <Row justify="space-between">
                <Col>Vận chuyển</Col>
                <Col>25.000 đ</Col>
              </Row>
            </div>

            <div className={style["wrapper"]}>
              <Row justify="space-between">
                <Col>
                  <div>Beyond Order - Vượt Lên Trật Tự</div>
                  <div>SL: x1</div>
                </Col>
                <Col>245.000 đ</Col>
              </Row>
              <Divider />
              <Row justify="space-between">
                <Col>Vận chuyển</Col>
                <Col>25.000 đ</Col>
              </Row>
            </div>
          </div>

          <div className={style["block"]}>
            <h3>Chọn hình thức thanh toán</h3>

            <Radio.Group>
              <Space direction="vertical">
                <Radio value="cod">Thanh toán tiền mặt khi nhận hàng (COD)</Radio>
                <Radio value="paypal">Thanh toán bằng Paypal</Radio>
              </Space>
            </Radio.Group>
          </div>
        </Col>

        <Col flex="350px">
          <div className={style["block"]}>
            <h3>Giao tới</h3>
            <Space>
              <b>Trần Văn A</b>
              <b>09029827299</b>
            </Space>
            <div style={{ marginTop: 5 }}>Số 1 Trường Chinh, quận Đống Đa, Hà Nội</div>
          </div>

          <div className={style["block"]}>
            <h3>Khuyến mại</h3>

            <Button type="primary" ghost icon={<TagOutlined />}>
              Chọn mã khuyến mại
            </Button>
          </div>

          <div className={style["block"]}>
            <h3>Thành tiền</h3>

            <Row justify="space-between">
              <div>Tạm tính</div>
              <div>400.000đ</div>
            </Row>

            <Row justify="space-between">
              <div>Phí vận chuyển</div>
              <div>50.000đ</div>
            </Row>

            <Row justify="space-between">
              <div>Giảm giá</div>
              <div>100.000đ</div>
            </Row>

            <Divider className={style["divider"]} />

            <Row justify="space-between">
              <div>Tổng tiền</div>
              <div>350.000đ</div>
            </Row>

            <br />

            <Button type="primary" block>
              Đặt hàng
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};
