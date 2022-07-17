import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { paths } from "../constants";
import { Container, Header } from "../layouts";
import {
  ChiTietDonHang,
  DangNhap,
  KqTimKiem,
  NoMatch,
  ProductDetail,
  QuanLyDonHang,
  TrangChu,
  paypal
} from "../pages";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={paths.login} component={DangNhap} />

        <Route
          render={() => (
            <>
              <Header />

              <Container>
                <Switch>
                  <Route exact path={paths.home} component={TrangChu} />
                  <Route exact path={paths.search} component={KqTimKiem} />
                  <Route
                    path={paths.product + "/:id"}
                    component={ProductDetail}
                  />
                  <Route exact path={paths.order} component={QuanLyDonHang} />
                  <Route
                    path={paths.order + "/:id"}
                    component={ChiTietDonHang}
                  />
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
