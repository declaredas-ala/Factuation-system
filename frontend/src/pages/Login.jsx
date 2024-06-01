import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Typography, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import { signInAsync } from "../store/userApiSlice";
import { setCredentials } from "../store/authSlice";
import "react-toastify/dist/ReactToastify.css";

const { Title, Text } = Typography;

const SignInForm = () => {
  const userinfo = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) {
      toast.error(
        "Veuillez entrer votre adresse e-mail et votre mot de passe!"
      );
      return;
    }

    try {
      const signInAction = await dispatch(signInAsync({ email, password }));
      if (signInAction.meta.requestStatus === "fulfilled") {
        dispatch(setCredentials(signInAction.payload));
        console.log("Login successful");
        navigate("/");
      } else {
        console.error("Error signing in:", signInAction.error.message);
        toast.error(
          "Échec de la connexion. Veuillez vérifier vos informations."
        );
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
      toast.error("Erreur de serveur. Veuillez réessayer plus tard.");
    }
  };

  useEffect(() => {
    if (userinfo) {
      navigate("/");
    }
  }, [navigate, userinfo]);

  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
        background: "linear-gradient(135deg, #f0f2f5 25%, #1890ff 100%)",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: 350,
          textAlign: "center",
          borderRadius: "15px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={2} style={{ color: "#1890ff", marginBottom: "20px" }}>
          Connectez-vous!
        </Title>
        <Form onFinish={handleSubmit} style={{ margin: "20px 0" }}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Veuillez entrer votre adresse e-mail!",
              },
            ]}
          >
            <Input
              type="text"
              placeholder="Adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              prefix={<UserOutlined />}
              autoComplete="email"
              style={{ borderRadius: "5px" }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Veuillez entrer votre mot de passe!",
              },
            ]}
          >
            <Input.Password
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              prefix={<LockOutlined />}
              autoComplete="on"
              style={{ borderRadius: "5px" }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                background: "#1890ff",
                borderColor: "#1890ff",
                borderRadius: "5px",
              }}
            >
              Se connecter
            </Button>
          </Form.Item>
        </Form>
        <Text style={{ marginTop: "20px" }}>
          Vous n'avez pas de compte?{" "}
          <Button type="link" onClick={() => navigate("/register")}>
            Inscrivez-vous
          </Button>
        </Text>
        <ToastContainer />
      </Card>
    </div>
  );
};

export default SignInForm;
