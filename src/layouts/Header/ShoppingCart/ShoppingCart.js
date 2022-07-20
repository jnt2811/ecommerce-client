import { ShoppingOutlined } from "@ant-design/icons";
import { useLazyQuery } from "@apollo/client";
import { Button, Col, Drawer, Row } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { paths } from "../../../constants";
import { GET_CART } from "../../../queries";

export const ShoppingCart = () => {
  const [visible, setVisible] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);
  const [getCart, { loading: list_loading, error: list_error, data: list_data }] = useLazyQuery(
    GET_CART,
    { variables: { userId: currentUser?.ID }, fetchPolicy: "no-cache" }
  );

  useEffect(() => {
    if (visible) getCart();
  }, [currentUser?.ID, getCart, visible]);

  console.log("get cart", list_data, list_loading, list_error);

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
