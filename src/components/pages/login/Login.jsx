import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Form, Input, Button, Card, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./login.module.css";
const Login = () => {
  const [redirect, setRedirect] = useState(false);

  const onFinish = async (values) => {
    try {
      const response = await fetch("https://soja-api.onrender.com/api/v1/iniciarSesionAdmin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data.error) {
        notification.error({
          message: "Error",
          description: data.error,
        });
      } else {
        sessionStorage.setItem("token", data.token);
        notification.success({
          message: "Success",
          description: "Has iniciado sesion correctamente, recarga la pagina y haz click en alguna pestaña del menu para acceder ",
        });
        setRedirect(true);
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Error",
        description: "There was an error while logging in. Please try again later.",
      });
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.divisor}>
    <Card className={styles.cardistry} style={{ width: 500 }}>
      <h1>Login</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: false }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Card>
    </div>
  );
};

export default Login;
