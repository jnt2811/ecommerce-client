import { UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu } from "antd";
import React from "react";

export const UserAccount = () => {
  return (
    <Dropdown
      placement="bottomRight"
      overlay={
        <Menu>
          <Menu.Item>Đơn hàng của tôi</Menu.Item>
          <Menu.Item>Tài khoản của tôi</Menu.Item>
          <Menu.Item>Thoát tài khoản</Menu.Item>
        </Menu>
      }
    >
      <Button icon={<UserOutlined />} type="primary" size="large"></Button>
    </Dropdown>
  );
};
