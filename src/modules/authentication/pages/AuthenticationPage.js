import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import "./AuthenticationPage.css";

const AuthenticationPage = ({ type }) => {
  if (type === "login") {
    return <LoginForm />;
  }
  if (type === "register") {
    return <RegistrationForm />;
  }
  if (type === "forgot-password") {
    // return <ForgotPasswordPage />;
  }
};

export default AuthenticationPage;
