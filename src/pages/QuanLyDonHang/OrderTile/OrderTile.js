import { Button, Col, Divider, Row, Space } from "antd";
import { paths } from "../../../constants";
import { useHistory } from "react-router-dom";

const OrderTile = ({ showFooter = true }) => {
  const history = useHistory();

  return (
    <div
      style={{
        border: "1px solid #00000010",
        backgroundColor: "#fff",
        padding: 20,
      }}
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
          <h3>Apple iPhone 13 Pro Max</h3>
        </Col>

        <Col>30.000.000 đ</Col>
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
                onClick={() => history.push(paths.order + "/12hda9sd")}
              >
                Xem chi tiết
              </Button>
            </Space>
          </Row>
        </>
      )}
    </div>
  );
};

export default OrderTile;
