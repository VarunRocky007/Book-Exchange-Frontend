import useHandleRegistration from "../hooks/useHandleRegistration";
import Snackbar from "@mui/material/Snackbar";
import TextInput from "../../../components/input_text/TextInput";
import TextError from "../../../components/error_text/TextError";
import { ThreeDot } from "react-loading-indicators";
import "./RegistrationForm.css";
const { useNavigate } = require("react-router-dom");

const RegistrationForm = () => {
  const navigate = useNavigate();
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    handleRegistration,
    loading,
    nameError,
    emailError,
    passwordError,
    confirmPasswordError,
    goToLogin,
    openSnackBar,
  } = useHandleRegistration();

  function onCloseSnackBar() {
    navigate("/auth/login");
  }

  if (loading) {
    return (
      <div className="registration-loader">
        <ThreeDot color="#ffffff" />
      </div>
    );
  }

  return (
    <div className="registration-container">
      <Snackbar
        open={openSnackBar}
        autoHideDuration={2000}
        onClose={onCloseSnackBar}
        message="Registration successful. Please login to continue."
      />
      <div className="registration-header">
        <div className="registration-title">
          Welcome to Book Exchange Platform
        </div>
        <div className="registration-title">Sign Up</div>
      </div>
      <div className="registration-form">
        <TextInput
          type="text"
          value={name}
          label="Name"
          onChange={(e) => setName(e.target.value)}
          error={nameError}
        />

        {nameError !== "" && <TextError errorText={nameError} />}

        <TextInput
          type="email"
          value={email}
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
        />

        {emailError !== "" && <TextError errorText={emailError} />}

        <TextInput
          type="password"
          value={password}
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
        />

        {passwordError !== "" && <TextError errorText={passwordError} />}

        <TextInput
          type="password"
          value={confirmPassword}
          label="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPasswordError}
        />

        {confirmPasswordError !== "" && (
          <TextError errorText={confirmPasswordError} />
        )}
      </div>

      <button type="submit" className="submit" onClick={handleRegistration}>
        <div className="common-font-bold">Sign Up</div>
      </button>

      <div className="sign-in">
        <div className="common-font">
          Already Have an Account?{" "}
          <button className="common-font-bold login-extra" onClick={goToLogin}>
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
