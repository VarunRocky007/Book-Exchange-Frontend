import LoginForm from "../components/LoginForm";
import "./AuthenticationPage.css";

const AuthenticationPage = ({ type }) => {
  if (type === "login") {
    return <LoginForm />;
  }
  if (type === "register") {
    // return <RegisterPage />;
  }
  if (type === "forgot-password") {
    // return <ForgotPasswordPage />;
  }
};

export default AuthenticationPage;
