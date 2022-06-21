import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { paths } from "../constants";
import { Header } from "../layouts";
import { KqTimKiem, NoMatch, TrangChu } from "../pages";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route exact path={paths.home} component={TrangChu} />
        <Route exact path={paths.search} component={KqTimKiem} />
        <Route component={NoMatch} />
      </Switch>
    </BrowserRouter>
  );
};
