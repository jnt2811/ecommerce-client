import style from "./trangChu.module.scss";
import { CateSider } from "./CateSider/CateSider";
import { Col, Layout, Row, Spin } from "antd";
import { ProductSort } from "./ProductSort/ProductSort";
import { ProductTile } from "../../components";
import { useLazyQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../queries";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../ducks/slices/productSlice";

export const TrangChu = () => {
  const [getProducts, { loading: list_loading, error: list_error, data: list_data }] =
    useLazyQuery(GET_PRODUCTS);
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  console.log("list products", list_data, list_loading, list_error);

  useEffect(() => {
    getProducts({ variables: { productLock: false }, fetchPolicy: "no-cache" });
    dispatch(updateProduct({ loading: true }));
  }, [dispatch, getProducts]);

  useEffect(() => {
    if (list_data) {
      dispatch(updateProduct({ loading: false, list: list_data.getProducts }));
    }
  }, [dispatch, list_data]);

  return (
    <Layout className={style["container"]}>
      <CateSider />

      <Layout.Content className={style["main"]}>
        <Spin spinning={product.loading}>
          <Row align="middle" justify="space-between">
            <Col>
              <h3>{product.list.length || 0} sản phẩm</h3>
            </Col>
            <Col>
              <ProductSort />
            </Col>
          </Row>

          <br />

          <Row gutter={[20, 20]}>
            {product.list.map((product) => (
              <Col span={6} key={product.ID}>
                <ProductTile product={product} />
              </Col>
            ))}
          </Row>
        </Spin>
      </Layout.Content>
    </Layout>
  );
};
