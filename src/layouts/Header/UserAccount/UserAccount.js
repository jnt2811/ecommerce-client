import { UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import { paths } from "../../../constants";

export const UserAccount = () => {
  const history = useHistory();

  return (
    <Dropdown
      placement="bottomRight"
      overlay={
        <Menu onClick={({ key }) => isNaN(Number(key)) && history.push(key)}>
          <Menu.Item key={paths.order}>Đơn hàng của tôi</Menu.Item>
          <Menu.Item key="2">Tài khoản của tôi</Menu.Item>
          <Menu.Item key="3">Thoát tài khoản</Menu.Item>
        </Menu>
      }
    >
      <Button icon={<UserOutlined />} type="primary" size="large"></Button>
    </Dropdown>
  );
};
