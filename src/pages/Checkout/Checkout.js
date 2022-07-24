import { TagOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Radio, Row, Space, Form, Input } from "antd";
import style from "./checkout.module.scss";
import {useLazyQuery, useMutation} from "@apollo/client";
import {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import {GET_USER_AND_CART} from "../../queries";
import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js";
import {keys} from "../../constants";
import {ADD_NEW_ORDER} from "../../queries/order.gql";

const initialOptions = {
  "client-id": keys.PAYPAL_SANDBOX_CLIENT_ID,
  currency: "USD",
  intent: "capture",
  // "data-client-token": "abc123xyz==",
};

export const Checkout = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const [visible, setVisible] = useState(false);
  const [deliveryInformation, setDeliveryInformation] = useState({});
  const [getCart, { loading: list_loading, error: list_error, data: list_data }] = useLazyQuery(
      GET_USER_AND_CART,
      {
        variables: { userId: currentUser?.ID },
        fetchPolicy: "no-cache",
        onCompleted: data => {
          setDeliveryInformation({
            NAME: `${data.getUsers[0].FIRST_NAME} ${data.getUsers[0].LAST_NAME}`,
            PHONE_NUMBER: data.getUsers[0].PHONE_NUMBER,
            ADDRESS: data.getUsers[0].ADDRESS
          })
        }
      });

  const [addNewOrder, { loading: list_order_loading, error: list_order_error, data: list_order_data}] = useMutation(
      ADD_NEW_ORDER
  );

  useEffect(() => {
    getCart()
  }, [currentUser?.ID, getCart]);

  console.log("get cart", list_data, list_loading, list_error);
  console.log("add new order", list_order_loading, list_order_error, list_order_data);

  const productTotalPrice = list_data?.getCart.reduce((p,c) => p.COUNT_PRODUCT*p.PRICE + c.COUNT_PRODUCT*c.PRICE)
  const deliveryTotalPrice = list_data?.getCart.reduce((p,c) => p.DELIVERY_PRICE+c.DELIVERY_PRICE)
  const discountTotalPrice = 100000
  const totalPrice = productTotalPrice + deliveryTotalPrice - discountTotalPrice

  const onSuccessPaypalPayment = (details) => {
    let orderID = details.id ? details.id : "O-" + (new Date()).getTime()
    handleAddNewOrder(orderID)
  }

  const onCreateOrder = (e) =>{
    let orderID = "O-" + (new Date()).getTime()
    handleAddNewOrder(orderID)
  }

  const handleAddNewOrder = (orderID) =>{
    let orderData = {
      ORDER_ID: orderID,
      USER_ID: currentUser?.ID,
      ...deliveryInformation,
      DELIVERY_METHOD: "COD",
      TOTAL_PRICE: totalPrice,
      PRODUCTS: list_data.getCart.map(c => {
        return {
          PRODUCT_ID: c.PRODUCT_ID,
          QUANTITY: c.COUNT_PRODUCT
        }
      })
    }
    console.log(orderData)
    addNewOrder({variables: {order: orderData}})
  }

  const onSuccessSetDeliveryInformation = (values) => {
    setDeliveryInformation(values)
  }

  const onFailSetDeliveryInformation = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }


  return (
    <div>
      <Row gutter={20}>
        <Col flex="auto">
          <div className={style["block"]}>
            <h3>Đơn hàng</h3>

            {list_data?.getCart.map(item => (
                <div className={style["wrapper"]} key={item.ID}>
                  <Row justify="space-between">
                    <Col>
                      <div>{item.PRODUCT_NAME}</div>
                      <div>{item.COUNT_PRODUCT}</div>
                    </Col>
                    <Col>{item.PRICE}</Col>
                  </Row>
                  <Divider />
                  <Row justify="space-between">
                    <Col>Vận chuyển</Col>
                    <Col>{item.DELIVERY_PRICE}</Col>
                  </Row>
                </div>
            ))}
          </div>

          <div className={style["block"]}>
            <h3>Chọn hình thức thanh toán</h3>

            <Radio.Group>
              <Space direction="vertical">
                <Radio value="cod" onClick={()=>{setVisible(true)}}>Thanh toán tiền mặt khi nhận hàng (COD)</Radio>
                <Radio value="paypal" onClick={()=>{setVisible(false)}}>Thanh toán bằng Paypal</Radio>
              </Space>
              <PayPalScriptProvider deferLoading={totalPrice ? true : false} options={initialOptions}>
                <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        description: "DISDIS",
                        purchase_units: [
                          {
                            amount: {
                              value: (Number(totalPrice)*0.000043).toFixed(2).toString(),
                            },
                          },
                        ],
                        application_context: {
                          shipping_preference: "NO_SHIPPING"
                        }
                      }).then((orderId) => {
                        // Your code here after create the order
                        return orderId;
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        onSuccessPaypalPayment(details)
                        alert(`Thanh toán thành công, đang chuyển hướng bạn về trang đơn hàng`);
                      });
                    }}
                />
              </PayPalScriptProvider>
            </Radio.Group>
          </div>
        </Col>

        <Col flex="350px">
          <div className={style["block"]}>
            <h3>Giao tới</h3>
            <Space>
              <b>{deliveryInformation?.NAME}</b>
              <b>{deliveryInformation?.PHONE_NUMBER}</b>
            </Space>
            <div style={{ marginTop: 5 }}>{deliveryInformation?.ADDRESS}</div>
          </div>
          <Form
              className={style["block"]}
              name="deliveryInformation"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              onFinish={onSuccessSetDeliveryInformation}
              onFinishFailed={onFailSetDeliveryInformation}
          >
            <h3>Giao tới</h3>
            <Form.Item
                label="Tên người nhận"
                name="NAME"
                rules={[{ required: true, message: 'Vui lòng nhập tên người nhận!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
                label="Số điện thoại"
                name="PHONE_NUMBER"
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
                label="Địa chỉ giao hàng"
                name="ADDRESS"
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ giao hàng!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Thay đổi
              </Button>
            </Form.Item>
          </Form>

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
              <div>{productTotalPrice}</div>
            </Row>

            <Row justify="space-between">
              <div>Phí vận chuyển</div>
              <div>{deliveryTotalPrice}</div>
            </Row>

            <Row justify="space-between">
              <div>Giảm giá</div>
              <div>{discountTotalPrice}</div>
            </Row>

            <Divider className={style["divider"]} />

            <Row justify="space-between">
              <div>Tổng tiền</div>
              <div>{totalPrice? totalPrice : 0}</div>
            </Row>

            <br />

            {
              visible? <Button type="primary" block onClick={(e) => onCreateOrder(e)}>
                Đặt hàng
              </Button> : <div></div>
            }
          </div>
        </Col>
      </Row>
    </div>
  );
};
