import { ShoppingOutlined } from "@ant-design/icons";
import { Button, Card, Rate, Row, Space, Tooltip } from "antd";
import style from "./product.module.scss";

export const Product = () => {
  return (
    <Card
      className={style["product"]}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <Row align="middle" justify="space-between">
          <div className={style["price"]}>100.000 đ</div>
          <Button
            icon={<ShoppingOutlined />}
            type="primary"
            shape="circle"
          ></Button>
        </Row>,
      ]}
    >
      <Card.Meta
        title={
          <Tooltip title="Lorem ipsum dolor sit amet">
            Lorem ipsum dolor sit amet
          </Tooltip>
        }
        description={
          <Space>
            <Rate value={5} allowHalf disabled />
            <small>(100)</small>
          </Space>
        }
      />
    </Card>
  );
};
