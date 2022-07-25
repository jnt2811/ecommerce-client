import { Card, Rate, Row, Space, Tooltip } from "antd";
import { useHistory } from "react-router-dom";
import { keys, paths } from "../../constants";
import { formatNumberToPrice } from "../../helpers";
import style from "./product.module.scss";

export const ProductTile = ({ product = {} }) => {
  const history = useHistory();

  const handleClick = () => {
    console.log(product);
    history.push(paths.product + "/" + product.ID);
  };

  const coverImage =
    !!product?.GALLERY && JSON.parse(product?.GALLERY).length > 0
      ? keys.SERVER_URI + JSON.parse(product?.GALLERY)[0]
      : null;

  return (
    <Card
      className={style["product"]}
      cover={<img alt="example" src={coverImage} />}
      actions={[
        <Row justify="start">
          <div className={style["price"]}>{formatNumberToPrice(product?.PRICE)} đ</div>
        </Row>,
      ]}
      onClick={handleClick}
    >
      <Card.Meta
        title={<Tooltip title={product?.PRODUCT_NAME}>{product?.PRODUCT_NAME}</Tooltip>}
        description={
          <Space size={0}>
            <Rate value={0} allowHalf disabled />
            <small>(0)</small>
          </Space>
        }
      />
    </Card>
  );
};
