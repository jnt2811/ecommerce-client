import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";
import { Form, Input, Layout, Button } from "antd";
import { useHistory } from "react-router-dom";
import { paths } from "../../constants";

export const DangNhap = () => {
  const history = useHistory();
  const { loginWithPopup, loginWithRedirect, logout, user, isAuthenticated } =
    useAuth0();

  const handleSubmit = (values) => {
    console.log("Login submit", values);
    history.push(paths.home);
  };

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      {/* <Form
        initialValues={{ remember: true }}
        style={{ width: 400, margin: "auto" }}
        onFinish={handleSubmit}
      >
        <h1 style={{ textAlign: "center", fontSize: 40 }}>Đăng nhập</h1>

        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            size="large"
            prefix={<UserOutlined />}
            placeholder="Tên đăng nhập"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            size="large"
            prefix={<LockOutlined />}
            type="password"
            placeholder="Mật khẩu"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form> */}

      <Button onClick={loginWithPopup}>Login with popup</Button>
      <Button onClick={loginWithRedirect}>Login with redirect</Button>
      <Button onClick={logout}>Logout</Button>

      <h3>User is {isAuthenticated ? "logged in" : "not logged in"}</h3>

      {isAuthenticated && <p>{JSON.stringify(user, null, 2)}</p>}
    </Layout>
  );
};
