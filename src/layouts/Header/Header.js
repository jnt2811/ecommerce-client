import { Affix, Col, Layout, Row, Space } from "antd";
import style from "./header.module.scss";
import { SearchProduct } from "./SearchProduct/SearchProduct";
import { ShoppingCart } from "./ShoppingCart/ShoppingCart";
import { UserAccount } from "./UserAccount/UserAccount";

export const Header = () => {
  return (
    <Affix>
      <Layout.Header className={style["container"]}>
        <Row align="middle" justify="space-between">
          <Col className={style["logo"]}>LOGO</Col>

          <Col span={10}>
            <SearchProduct />
          </Col>

          <Col>
            <Space align="center">
              <UserAccount />
              <ShoppingCart />
            </Space>
          </Col>
        </Row>
      </Layout.Header>
    </Affix>
  );
};
