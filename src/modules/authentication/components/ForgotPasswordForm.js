import "./ForgotPasswordForm.css";
import { ThreeDot } from "react-loading-indicators";
import Snackbar from "@mui/material/Snackbar";
import useHandleForgotPassword from "../hooks/useHandleForgotPassword";
import TextInput from "../../../components/input_text/TextInput";
import TextError from "../../../components/error_text/TextError";

const ForgotPasswordForm = () => {
  const {
    email,
    setEmail,
    loading,
    handleForgotPassword,
    otp,
    setOtp,
    otpView,
    handleVerifyOtp,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    passwordView,
    handleResetPassword,
    openSnackBar,
    goToLogin,
    passwordApiError,
    emailError,
    otpError,
    passwordError,
    confirmPasswordError,
  } = useHandleForgotPassword();

  if (loading) {
    return (
      <div className="forgot-password-loader">
        <ThreeDot color="#000000" />
      </div>
    );
  }

  return (
    <div className="forgot-password-container">
      <Snackbar
        open={openSnackBar}
        autoHideDuration={2000}
        onClose={() => goToLogin()}
        message="Password Reset successful. Please login to continue."
      />
      <div className="forgot-password-header">
        <div className="forgot-password-title">Book Exchange Platform</div>
        <div className="forgot-password-title">Forgot Password</div>
      </div>
      <div className="forgot-password-form">
        {otpView ? (
          <div>
            <TextInput
              type="text"
              value={otp}
              label="OTP"
              onChange={(e) => setOtp(e.target.value)}
            />
            {otpError !== "" && <TextError errorText={otpError} />}
            <button
              type="submit"
              className="submit"
              onClick={handleVerifyOtp()}
            >
              <div className="common-font-bold">Verify OTP</div>
            </button>
          </div>
        ) : passwordView ? (
          <div className="forgot-password-form">
            <TextInput
              type="password"
              value={password}
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError !== "" && <TextError errorText={passwordError} />}

            <TextInput
              type="password"
              value={confirmPassword}
              label="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPasswordError !== "" && (
              <TextError errorText={confirmPasswordError} />
            )}
            {passwordApiError !== "" && (
              <TextError errorText={passwordApiError} />
            )}
            <button
              type="submit"
              className="submit"
              onClick={handleResetPassword()}
            >
              <div className="common-font-bold">Reset Password</div>
            </button>
          </div>
        ) : (
          <div>
            <TextInput
              type="email"
              value={email}
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError !== "" && <TextError errorText={emailError} />}
            <button
              type="submit"
              className="submit"
              onClick={handleForgotPassword()}
            >
              {" "}
              Get OTP{" "}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
