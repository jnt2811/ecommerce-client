import { CloseOutlined, EditOutlined, TagOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Radio, Row, Space, Form, Input, Image } from "antd";
import style from "./checkout.module.scss";
import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GET_USER_AND_CART } from "../../queries";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { keys, paths } from "../../constants";
import { formatNumberToPrice } from "../../helpers";
import { ADD_NEW_ORDER } from "../../queries/order.gql";
import { useHistory } from "react-router-dom";

const initialOptions = {
  "client-id": keys.PAYPAL_SANDBOX_CLIENT_ID,
  currency: "USD",
  intent: "capture",
  // "data-client-token": "abc123xyz==",
};

export const Checkout = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const [deliveryInformation, setDeliveryInformation] = useState({});
  const [getCart, { loading: list_loading, error: list_error, data: list_data }] = useLazyQuery(
    GET_USER_AND_CART,
    {
      variables: { userId: currentUser?.ID },
      fetchPolicy: "no-cache",
      onCompleted: (data) => {
        setDeliveryInformation({
          NAME: `${data.getUsers[0].FIRST_NAME} ${data.getUsers[0].LAST_NAME}`,
          PHONE_NUMBER: data.getUsers[0].PHONE_NUMBER,
          ADDRESS: data.getUsers[0].ADDRESS,
        });
      },
    }
  );
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [visibleDeliveryForm, setVisibleDeliveryForm] = useState(false);
  const history = useHistory();
  const [orderId, setOrderId] = useState("");

  const [
    addNewOrder,
    { loading: list_order_loading, error: list_order_error, data: list_order_data },
  ] = useMutation(ADD_NEW_ORDER, {
    onCompleted: () => history.push(paths.order + `/${orderId}`),
  });

  useEffect(() => {
    getCart();
  }, [currentUser?.ID, getCart]);

  console.log("get cart", list_data, list_loading, list_error);
  console.log("add new order", list_order_loading, list_order_error, list_order_data);

  const productTotalPrice = list_data?.getCart.reduce(
    (sum, item) => sum + item.COUNT_PRODUCT * item.PRICE,
    0
  );
  const deliveryTotalPrice = list_data?.getCart.reduce((sum, item) => sum + item.DELIVERY_PRICE, 0);
  const discountTotalPrice = 100000;
  const totalPrice = productTotalPrice + deliveryTotalPrice - discountTotalPrice;

  const onSuccessPaypalPayment = (details) => {
    let orderID = details.id ? details.id : "O-" + new Date().getTime();
    handleAddNewOrder(orderID);
  };

  const onCreateOrder = (e) => {
    let orderID = "O-" + new Date().getTime();
    handleAddNewOrder(orderID);
  };

  const handleAddNewOrder = (orderID) => {
    let orderData = {
      ORDER_ID: orderID,
      USER_ID: currentUser?.ID,
      ...deliveryInformation,
      DELIVERY_METHOD: "COD",
      TOTAL_PRICE: totalPrice,
      PRODUCTS: list_data.getCart.map((c) => {
        return {
          PRODUCT_ID: c.PRODUCT_ID,
          QUANTITY: c.COUNT_PRODUCT,
          PRODUCT_OPTIONS: c.PRODUCT_OPTIONS,
        };
      }),
    };

    console.log(orderData);

    setOrderId(orderID);
    addNewOrder({ variables: { order: orderData } });

    // setTimeout(() => {
    //
    // }, 500);
  };

  const onSuccessSetDeliveryInformation = (values) => {
    setDeliveryInformation(values);
  };

  const onFailSetDeliveryInformation = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChangePaymentMethod = (e) => {
    const { value } = e.target;
    setPaymentMethod(value);
  };

  const renderProductImage = (item) => {
    let src = "";
    if (!!item?.GALLERY && JSON.parse(item?.GALLERY).length > 0) {
      src = keys.SERVER_URI + JSON.stringify(item.GALLERY)[0];
    }
    return <Image preview={false} src={src} width={80} height={80} />;
  };

  console.log("aaaaaaabb", totalPrice);

  return (
    <div>
      <Row gutter={20}>
        <Col flex="auto">
          <div className={style["block"]}>
            <h3>Đơn hàng</h3>

            {list_data?.getCart.map((item) => (
              <div className={style["wrapper"]} key={item.ID}>
                <Row justify="space-between">
                  <Col>
                    <Space size={20}>
                      {renderProductImage(item)}

                      <div>
                        <h4>{item.PRODUCT_NAME}</h4>
                        <div>{item.COUNT_PRODUCT}</div>
                        <div style={{ fontSize: 12, marginTop: 5 }}>
                          Loại: {item.PRODUCT_OPTIONS}
                        </div>
                      </div>
                    </Space>
                  </Col>
                  <Col>{formatNumberToPrice(item.PRICE)}</Col>
                </Row>
                <Divider />
                <Row justify="space-between">
                  <Col>Vận chuyển</Col>
                  <Col>{formatNumberToPrice(item.DELIVERY_PRICE)}</Col>
                </Row>
              </div>
            ))}
          </div>

          <div className={style["block"]}>
            <h3>Chọn hình thức thanh toán</h3>

            <Radio.Group value={paymentMethod} onChange={handleChangePaymentMethod}>
              <Space direction="vertical">
                <Radio value="cod">Thanh toán tiền mặt khi nhận hàng (COD)</Radio>
                <Radio value="paypal">Thanh toán bằng Paypal</Radio>
              </Space>

              <div
                style={{
                  display: totalPrice && paymentMethod === "paypal" ? "block" : "none",
                  marginTop: 20,
                }}
              >
                <PayPalScriptProvider
                  deferLoading={totalPrice ? true : false}
                  options={initialOptions}
                >
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order
                        .create({
                          description: "DISDIS",
                          purchase_units: [
                            {
                              amount: {
                                value: (Number(totalPrice) * 0.000043).toFixed(2).toString(),
                              },
                            },
                          ],
                          application_context: {
                            shipping_preference: "NO_SHIPPING",
                          },
                        })
                        .then((orderId) => {
                          // Your code here after create the order
                          return orderId;
                        });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        onSuccessPaypalPayment(details);
                        alert(`Thanh toán thành công, đang chuyển hướng bạn về trang đơn hàng`);
                      });
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            </Radio.Group>
          </div>
        </Col>

        <Col flex="350px">
          <div className={style["block"]}>
            <Row align="middle" justify="space-between" style={{ marginBottom: 10 }}>
              <h3 style={{ marginBottom: 0 }}>Giao tới</h3>
              {!visibleDeliveryForm && (
                <Button
                  icon={<EditOutlined />}
                  type="link"
                  onClick={() => setVisibleDeliveryForm(true)}
                ></Button>
              )}
            </Row>

            <Space>
              <b>{deliveryInformation?.NAME}</b>
              <b>{deliveryInformation?.PHONE_NUMBER}</b>
            </Space>
            <div style={{ marginTop: 5 }}>{deliveryInformation?.ADDRESS}</div>
          </div>

          <Form
            className={style["block"]}
            name="deliveryInformation"
            layout="vertical"
            onFinish={onSuccessSetDeliveryInformation}
            onFinishFailed={onFailSetDeliveryInformation}
            style={{ display: visibleDeliveryForm ? "block" : "none" }}
          >
            <Row align="middle" justify="space-between" style={{ marginBottom: 10 }}>
              <h3 style={{ marginBottom: 0 }}>Giao tới</h3>
              <Button
                icon={<CloseOutlined />}
                type="link"
                onClick={() => setVisibleDeliveryForm(false)}
              ></Button>
            </Row>

            <Form.Item
              label="Tên người nhận"
              name="NAME"
              rules={[{ required: true, message: "Vui lòng nhập tên người nhận!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="PHONE_NUMBER"
              rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Địa chỉ giao hàng"
              name="ADDRESS"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ giao hàng!" }]}
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
              <div>{formatNumberToPrice(productTotalPrice)}đ</div>
            </Row>

            <Row justify="space-between">
              <div>Phí vận chuyển</div>
              <div>{formatNumberToPrice(deliveryTotalPrice)}đ</div>
            </Row>

            <Row justify="space-between">
              <div>Giảm giá</div>
              <div>{formatNumberToPrice(discountTotalPrice)}đ</div>
            </Row>

            <Divider className={style["divider"]} />

            <Row justify="space-between">
              <div>Tổng tiền</div>
              <div>{totalPrice ? formatNumberToPrice(totalPrice) : 0}đ</div>
            </Row>

            {paymentMethod === "cod" && (
              <Button
                type="primary"
                block
                onClick={(e) => onCreateOrder(e)}
                style={{ marginTop: 20 }}
              >
                Đặt hàng
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};
