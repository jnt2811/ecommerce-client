import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { paths } from "../constants";
import { Container, Header } from "../layouts";
import {
  ChiTietDonHang,
  DangKy,
  DangNhap,
  KqTimKiem,
  NoMatch,
  ProductDetail,
  QuanLyDonHang,
  TrangChu,
  paypal,
} from "../pages";
import { AuthRoute, PrivateRoute } from "./ConfigRoutes";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute exact path={paths.login} component={DangNhap} />
        <AuthRoute exact path={paths.signup} component={DangKy} />

        <Route
          render={() => (
            <>
              <Header />

              <Container>
                <Switch>
                  <Route exact path={paths.home} component={TrangChu} />
                  <Route exact path={paths.search} component={KqTimKiem} />
                  <Route path={paths.product + "/:id"} component={ProductDetail} />
                  <PrivateRoute exact path={paths.order} component={QuanLyDonHang} />
                  <PrivateRoute path={paths.order + "/:id"} component={ChiTietDonHang} />
                  <Route exact path={paths.payment} component={paypal} />
                  <Route component={NoMatch} />
                </Switch>
              </Container>
            </>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};
