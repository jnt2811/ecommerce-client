import { Affix, Col, Layout, Row, Space } from "antd";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { paths } from "../../constants";
import style from "./header.module.scss";
import { SearchProduct } from "./SearchProduct/SearchProduct";
import { ShoppingCart } from "./ShoppingCart/ShoppingCart";
import { UserAccount } from "./UserAccount/UserAccount";

export const Header = () => {
  const { pathname } = useLocation();
  const currentUser = useSelector((state) => state.auth.user);

  const isAtProductPage =
    pathname === paths.home || pathname === paths.search || pathname.includes(paths.product);

  const isAtCheckoutPage = pathname === paths.checkout;

  return (
    <Affix>
      <Layout.Header className={style["container"]}>
        <Row align="middle" justify="space-between">
          <Col>
            <Link to={paths.home} className={style["logo"]}>
              CLIENT
            </Link>
          </Col>

          <Col span={14}>{isAtProductPage && <SearchProduct />}</Col>

          <Col>
            <Space align="center">
              <UserAccount />
              {!isAtCheckoutPage && currentUser && <ShoppingCart />}
            </Space>
          </Col>
        </Row>
      </Layout.Header>
    </Affix>
  );
};
