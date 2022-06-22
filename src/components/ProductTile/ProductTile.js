import { ShoppingOutlined } from "@ant-design/icons";
import { Button, Card, Rate, Row, Space, Tooltip } from "antd";
import { useHistory } from "react-router-dom";
import { paths } from "../../constants";
import style from "./product.module.scss";

export const ProductTile = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push(paths.product + "/l1Ad0osn");
  };

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
        <Row justify="start">
          <div className={style["price"]}>100.000 đ</div>
        </Row>,
      ]}
      onClick={handleClick}
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
