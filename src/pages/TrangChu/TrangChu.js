import style from "./trangChu.module.scss";
import { CateSider } from "./CateSider/CateSider";
import { Col, Layout, Row, Spin } from "antd";
import { ProductSort } from "./ProductSort/ProductSort";
import { ProductTile } from "../../components";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../queries";

export const TrangChu = () => {
  const {
    loading: list_loading,
    error: list_error,
    data: list_data,
    refetch: list_refetch,
  } = useQuery(GET_PRODUCTS, { variables: { productLock: false }, fetchPolicy: "no-cache" });

  console.log("list products", list_data, list_loading, list_error);

  return (
    <Layout className={style["container"]}>
      <CateSider />

      <Layout.Content className={style["main"]}>
        <Spin spinning={list_loading}>
          <Row align="middle" justify="space-between">
            <Col>
              <h3>{list_data?.getProducts?.length || 0} sản phẩm</h3>
            </Col>
            <Col>
              <ProductSort />
            </Col>
          </Row>

          <br />

          <Row gutter={[20, 20]}>
            {list_data?.getProducts?.map((product) => (
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
