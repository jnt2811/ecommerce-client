import { keys, paths } from "../constants";
import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../ducks/slices/authSlice";

export const AuthRoute = ({ component: Component, ...remainingProps }) => {
  const currentUser = useSelector((state) => state.auth.user);
  const isAuth = !!currentUser;
  const localUser = localStorage.getItem(keys.USER_INFO);
  const dispatch = useDispatch();

  if (!isAuth && !!localUser) {
    try {
      const parsedUser = JSON.parse(localUser);
      dispatch(updateUser(parsedUser));
      return <div>Loading...</div>;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Route
      {...remainingProps}
      render={(props) => {
        return isAuth ? <Redirect to={paths.home} /> : <Component {...props} />;
      }}
    />
  );
};

export const PrivateRoute = ({ component: Component, ...remainingProps }) => {
  const currentUser = useSelector((state) => state.auth.user);
  const isAuth = !!currentUser;
  const localUser = localStorage.getItem(keys.USER_INFO);
  const dispatch = useDispatch();

  if (!isAuth && !!localUser) {
    try {
      const parsedUser = JSON.parse(localUser);
      dispatch(updateUser(parsedUser));
      return <div>Loading...</div>;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Route
      {...remainingProps}
      render={(props) => {
        return isAuth ? <Component {...props} /> : <Redirect to={paths.login} />;
      }}
    />
  );
};

export const PublicRoute = ({ component: Component, ...remainingProps }) => {
  const currentUser = useSelector((state) => state.auth.user);
  const isAuth = !!currentUser;
  const localUser = localStorage.getItem(keys.USER_INFO);
  const dispatch = useDispatch();

  if (!isAuth && !!localUser) {
    try {
      const parsedUser = JSON.parse(localUser);
      dispatch(updateUser(parsedUser));
      return <div>Loading...</div>;
    } catch (error) {
      console.log(error);
    }
  }

  return <Route {...remainingProps} component={Component} />;
};
