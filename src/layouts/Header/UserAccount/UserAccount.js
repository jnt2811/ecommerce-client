import { UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import { paths } from "../../../constants";

const LOGOUT = "logout";

export const UserAccount = () => {
  const history = useHistory();

  const menuItems = [
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

  const handleMenu = ({ key }) => {
    if (key === LOGOUT) return;
    history.push(key);
  };

  return (
    <Dropdown placement="bottomRight" overlay={<Menu items={menuItems} onClick={handleMenu} />}>
      <Button icon={<UserOutlined />} type="primary" size="large"></Button>
    </Dropdown>
  );
};
