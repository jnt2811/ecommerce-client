import { UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { paths } from "../../../constants";
import { updateUser } from "../../../ducks/slices/authSlice";

const LOGOUT = "logout";

export const UserAccount = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const loggedInItems = [
    {
      key: paths.order,
      label: "Đơn hàng của tôi",
    },
    {
      key: paths.account,
      label: "Tài khoản của tôi",
    },
    {
      key: LOGOUT,
      label: "Thoát tài khoản",
    },
  ];

  const notLoggedInItems = [
    {
      key: paths.login,
      label: "Đăng nhập",
    },
    {
      key: paths.signup,
      label: "Đăng ký",
    },
  ];

  const handleMenu = ({ key }) => {
    if (key === LOGOUT) {
      localStorage.clear();
      dispatch(updateUser());
      return;
    }
    history.push(key);
  };

  return (
    <Dropdown
      placement="bottomRight"
      overlay={<Menu items={currentUser ? loggedInItems : notLoggedInItems} onClick={handleMenu} />}
    >
      <Button icon={<UserOutlined />} type="primary" size="large"></Button>
    </Dropdown>
  );
};
