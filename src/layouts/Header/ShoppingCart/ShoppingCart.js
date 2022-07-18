import { ShoppingOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Row } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { paths } from "../../../constants";

export const ShoppingCart = () => {
  const [visible, setVisible] = useState(false);

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" icon={<ShoppingOutlined />} size="large" onClick={handleOpen}></Button>

      <Drawer
        title="Giỏ hàng"
        visible={visible}
        onClose={handleClose}
        footer={
          <>
            <Row justify="space-between" style={{ marginBottom: 10 }}>
              <Col>Tổng thanh toán (0)</Col>
              <Col>0 VND</Col>
            </Row>
            <Link to={paths.checkout} onClick={() => setVisible(false)}>
              <Button type="primary" block size="large">
                Thanh toán
              </Button>
            </Link>
          </>
        }
      ></Drawer>
    </>
  );
};
