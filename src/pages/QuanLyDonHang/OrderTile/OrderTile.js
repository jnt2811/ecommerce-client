import { Button, Col, Divider, Row, Space } from "antd";
import { paths } from "../../../constants";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_ORDERS } from "../../../queries/order.gql";
import { formatNumberToPrice } from "../../../helpers";

const OrderTile = ({ showFooter = true }) => {
  const history = useHistory();
  const currentUser = useSelector((state) => state.auth.user);
  const [getOrders, { loading: list_loading, error: list_error, data: list_data }] = useLazyQuery(
    GET_ORDERS,
    {
      variables: { userId: currentUser?.ID },
      fetchPolicy: "no-cache",
    }
  );

  useEffect(() => {
    getOrders();
  }, [currentUser?.ID, getOrders]);

  console.log("get order", list_data, list_loading, list_error);

  return (
    <div>
      {list_data?.getOrders.map((item) => (
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
                // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                style={{
                  width: "100%",
                  aspectRatio: "1/1",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </Col>

            <Col flex="auto">
              <h3>{item.NAME}</h3>
              <h4 style={{ fontWeight: "400" }}>{item.PHONE_NUMBER}</h4>
              <h4 style={{ fontWeight: "400" }}>{item.ADDRESS}</h4>
            </Col>

            <Col>{formatNumberToPrice(item.TOTAL_PRICE)}đ</Col>
          </Row>

          {showFooter && (
            <>
              <Divider />

              <Row justify="end">
                <Space>
                  <Button type="primary" ghost>
                    Mua lại
                  </Button>
                  <Button
                    type="primary"
                    ghost
                    onClick={() => history.push(paths.order + `/${item.ID}`)}
                  >
                    Xem chi tiết
                  </Button>
                </Space>
              </Row>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderTile;
