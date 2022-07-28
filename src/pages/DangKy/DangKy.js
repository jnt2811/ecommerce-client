import { useMutation } from "@apollo/client";
import { Button, Col, Form, Input, notification, Row, Typography } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { keys, paths } from "../../constants";
import { updateUser } from "../../ducks/slices/authSlice";
import { encrypt256 } from "../../helpers";
import { USER_SIGNUP } from "../../queries";

export const DangKy = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleSignupComplete = (data) => {
    if (data?.addNewUser?.status === "OK") {
      form.resetFields();

      const token = data?.addNewUser?.token;
      const user_info = data?.addNewUser?.user;

      dispatch(updateUser(user_info));

      localStorage.setItem(keys.ACCESS_TOKEN, token);
      localStorage.setItem(keys.USER_INFO, JSON.stringify(user_info));

      notification.success({ message: "Signup success!", placement: "bottomLeft" });
    }
  };

  const [addUser, { loading: add_loading }] = useMutation(USER_SIGNUP, {
    onCompleted: handleSignupComplete,
  });

  const onFinish = (values) => {
    delete values.CONFIRM;

    console.log(values);

    values.PASSWORD = encrypt256(values.PASSWORD);

    addUser({ variables: { users: [values] } });
  };

  return (
    <Row>
      <Col span={12}></Col>

      <Col span={12} style={styles.main}>
        <Typography.Title>Đăng ký ngay</Typography.Title>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item label="Họ" name="LAST_NAME" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Tên đệm và tên" name="FIRST_NAME" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Email" name="EMAIL" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Số điện thoại" name="PHONE_NUMBER" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Mật khẩu" name="PASSWORD" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="CONFIRM"
            hasFeedback
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("PASSWORD") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password autoComplete="false" />
          </Form.Item>

          <Button block type="primary" htmlType="submit" loading={add_loading}>
            Đăng ký
          </Button>
        </Form>

        <br />
        <div>
          Bạn đã có tài khoản? <Link to={paths.login}>Hãy đăng nhập ngay!</Link>
        </div>
      </Col>
    </Row>
  );
};

const styles = {
  main: {
    height: "100vh",
    oveflow: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingRight: "calc((100vw - 1000px)/2)",
  },
};
