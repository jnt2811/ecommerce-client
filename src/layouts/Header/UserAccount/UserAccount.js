import { UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import { paths } from "../../../constants";
import { useAuth } from "../../../contexts/AuthContext";

const LOGOUT = "logout";

export const UserAccount = () => {
  const history = useHistory();
  const { currentUser, setCurrentUser } = useAuth();

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
      setCurrentUser();
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
