import { UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import React from "react";

export const UserAccount = () => {
  return (
    <Dropdown
      placement="bottomRight"
      overlay={
        <Menu>
          <Menu.Item key="1">Đơn hàng của tôi</Menu.Item>
          <Menu.Item key="2">Tài khoản của tôi</Menu.Item>
          <Menu.Item key="3">Thoát tài khoản</Menu.Item>
        </Menu>
      }
    >
      <Button icon={<UserOutlined />} type="primary" size="large"></Button>
    </Dropdown>
  );
};
