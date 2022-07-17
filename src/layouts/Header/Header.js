import { Affix, Col, Layout, Row, Space } from "antd";
import { Link } from "react-router-dom";
import { paths } from "../../constants";
import style from "./header.module.scss";
import { SearchProduct } from "./SearchProduct/SearchProduct";
import { ShoppingCart } from "./ShoppingCart/ShoppingCart";
import { UserAccount } from "./UserAccount/UserAccount";

export const Header = () => {
  return (
    <Affix>
      <Layout.Header className={style["container"]}>
        <Row align="middle" justify="space-between">
          <Col>
            <Link to={paths.home} className={style["logo"]}>
              CLIENT
            </Link>
          </Col>

          <Col span={14}>
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
