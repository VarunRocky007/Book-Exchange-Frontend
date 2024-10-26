import useHandleRegistration from "../hooks/useHandleRegistration";
import TextInput from "../../../components/input_text/TextInput";
import TextError from "../../../components/error_text/TextError";
import { ThreeDot } from "react-loading-indicators";
import "./RegistrationForm.css";

const RegistrationForm = () => {
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
  } = useHandleRegistration();

  if (loading) {
    return (
      <div className="registration-loader">
        <ThreeDot color="#ffffff" />
      </div>
    );
  }

  return (
    <div className="registration-container">
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
