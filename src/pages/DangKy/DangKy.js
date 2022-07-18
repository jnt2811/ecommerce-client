import { useMutation, useQuery } from "@apollo/client";
import { Button, Col, Form, Input, notification, Row, Select, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { keys, paths } from "../../constants";
import { useAuth } from "../../contexts/AuthContext";
import { encrypt256 } from "../../helpers";
import { USER_SIGNUP } from "../../queries";

export const DangKy = () => {
  const [form] = Form.useForm();
  const [addSeller, { data: add_data, loading: add_loading, error: add_error }] =
    useMutation(USER_SIGNUP);
  const [tempUserData, setTempUserData] = useState();
  const { setCurrentUser } = useAuth();

  console.log("user signup", add_data, add_loading, add_error);

  useEffect(() => {
    if (add_data) {
      if (add_data?.addNewSeller?.status === "OK") {
        form.resetFields();
        setCurrentUser(tempUserData);

        const token = add_data?.addNewSeller?.token;

        localStorage.setItem(keys.ACCESS_TOKEN, token);
        localStorage.setItem(keys.USER_INFO, JSON.stringify(tempUserData));

        notification.success({ message: "Signup successfully!" });
      } else if (add_data?.addNewSeller?.status === "KO") {
        console.log("SIGNUP FAILED!");
        notification.error({ message: add_data?.addNewSeller?.message });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [add_data]);

  const onFinish = (values) => {
    delete values.CONFIRM;

    console.log(values);

    values.PASSWORD = encrypt256(values.PASSWORD);

    setTempUserData(values);

    addSeller({ variables: { sellers: [values] } });
  };

  return (
    <Row>
      <Col span={12}></Col>

      <Col span={12} style={styles.main}>
        <Typography.Title>Đăng ký ngay</Typography.Title>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item label="Họ và tên" name="SELLER_NAME" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

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
