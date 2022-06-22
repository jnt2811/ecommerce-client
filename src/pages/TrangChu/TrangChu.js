import style from "./trangChu.module.scss";
import { CateSider } from "./CateSider/CateSider";
import { Col, Row } from "antd";
import { ProductSort } from "./ProductSort/ProductSort";
import { ProductTile } from "../../components";

export const TrangChu = () => {
  return (
    <div className={style["container"]}>
      <CateSider />

      <div className={style["main"]}>
        <Row align="middle" justify="space-between">
          <Col>
            <h3>10 sản phẩm</h3>
          </Col>
          <Col>
            <ProductSort />
          </Col>
        </Row>

        <br />

        <Row gutter={[20, 20]}>
          <Col span={6}>
            <ProductTile />
          </Col>
          <Col span={6}>
            <ProductTile />
          </Col>
          <Col span={6}>
            <ProductTile />
          </Col>
          <Col span={6}>
            <ProductTile />
          </Col>
          <Col span={6}>
            <ProductTile />
          </Col>
          <Col span={6}>
            <ProductTile />
          </Col>
        </Row>
      </div>
    </div>
  );
};
