import style from "./trangChu.module.scss";
import { CateSider } from "./CateSider/CateSider";
import { Col, Row } from "antd";
import { ProductSort } from "./ProductSort/ProductSort";
import { Product } from "./Product/Product";

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
            <Product />
          </Col>
          <Col span={6}>
            <Product />
          </Col>
          <Col span={6}>
            <Product />
          </Col>
          <Col span={6}>
            <Product />
          </Col>
          <Col span={6}>
            <Product />
          </Col>
          <Col span={6}>
            <Product />
          </Col>
        </Row>
      </div>
    </div>
  );
};
