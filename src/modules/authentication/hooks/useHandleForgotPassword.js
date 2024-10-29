const { useState, useCallback } = require("react");
const { useNavigate } = require("react-router-dom");

const useHandleForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpView, setOtpView] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordApiError, setPasswordApiError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordView, setPasswordView] = useState(false);
  const [otpId, setOtpId] = useState("");
  const [verificationId, setVerificationId] = useState("");

  const handleForgotPassword = useCallback(
    () => async () => {
      setEmailError("");
      if (email.trim() === "") {
        setEmailError("Email is required.");
        return;
      }
      setLoading(true);
      try {
        const data = await fetch(
          "http://localhost:3000/api/v1/users/forgot-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
            }),
          }
        );
        const response = await data.json();
        if (response.error) {
          setEmailError(response.message);
          setLoading(false);
          return;
        }
        setOtpView(true);
        setOtpId(response.data.otpId);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        return;
      }
    },
    [email]
  );

  const handleVerifyOtp = useCallback(
    () => async () => {
      setOtpError("");
      if (otp.trim() === "") {
        setOtpError("OTP is required.");
        return;
      }
      setLoading(true);
      try {
        const data = await fetch(
          "http://localhost:3000/api/v1/users/verify-otp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              otp: otp,
              otpId: otpId,
            }),
          }
        );
        const response = await data.json();
        if (response.error) {
          setOtpError(response.message);
          setLoading(false);
          return;
        }
        setVerificationId(response.data.verifyToken);
        setOtpView(false);
        setPasswordView(true);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        return;
      }
    },
    [otp, otpId]
  );

  const handleResetPassword = useCallback(
    () => async () => {
      setPasswordError("");
      setConfirmPasswordError("");
      if (password.trim() === "" || confirmPassword.trim() === "") {
        setPasswordError("Password is required.");
        return;
      }
      if (password !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match.");
        return;
      }
      setLoading(true);
      try {
        const data = await fetch(
          "http://localhost:3000/api/v1/users/reset-password",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              otpId: otpId,
              password: password,
              confirmPassword: confirmPassword,
              verifyToken: verificationId,
            }),
          }
        );

        const response = await data.json();
        if (response.status === "success") {
          setOpenSnackBar(true);
          setLoading(false);
          return;
        }
        if (response.error.errors.password.name === "ValidatorError") {
          setPasswordError("Password must be at least 8 characters long.");
          setLoading(false);
          return;
        }
        if (response.error) {
          setPasswordApiError(response.message);
          setLoading(false);
          return;
        }
        setOpenSnackBar(true);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        return;
      }
    },
    [password, confirmPassword, verificationId, otpId]
  );

  function goToLogin() {
    navigate("/auth/login");
  }

  return {
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
    emailError,
    otpError,
    passwordError,
    confirmPasswordError,
    passwordApiError,
  };
};

export default useHandleForgotPassword;
