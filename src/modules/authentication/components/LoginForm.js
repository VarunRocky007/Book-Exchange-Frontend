import React from "react";
import TextInput from "../../../components/input_text/TextInput";
import TextError from "../../../components/error_text/TextError";
import useHandleLoginHook from "../hooks/useHandleLogin";
import "./LoginForm.css";
import { ThreeDot } from "react-loading-indicators";

const LoginForm = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
    loading,
    error,
    goToSignUp,
    goToForgotPassword,
  } = useHandleLoginHook();

  if (loading) {
    return (
      <div className="login-loader">
        <ThreeDot color="#ffffff" />
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="login-title">Book Exchange Platform</div>
        <div className="login-title">Log In</div>
      </div>
      <div className="login-form">
        <TextInput
          type="email"
          value={username}
          label="Email"
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextInput
          type="password"
          value={password}
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error !== "" && <TextError errorText={error} />}
      <button type="submit" className="submit" onClick={handleLogin()}>
        <div className="common-font-bold">Login</div>
      </button>

      <div className="sign-up">
        <div className="common-font">
          Don't Have an Account?{" "}
          <button className="common-font-bold login-extra" onClick={goToSignUp}>
            Sign Up
          </button>
        </div>
      </div>
      <div className="forgot-password">
        <button
          className="common-font-bold login-extra"
          onClick={goToForgotPassword}
        >
          Forgot Password
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
