const { useState, useCallback } = require("react");
const { useNavigate } = require("react-router-dom");

const useHandleRegistration = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleRegistration = useCallback(async () => {
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (name.trim() === "") {
      setNameError("Name is required.");
      return;
    }
    if (email.trim() === "") {
      setEmailError("Email is required.");
      return;
    }
    if (password.trim() === "") {
      setPasswordError("Password is required.");
      return;
    }
    if (confirmPassword.trim() === "") {
      setConfirmPasswordError("Confirm Password is required.");
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const data = await fetch("http://localhost:3000/api/v1/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        }),
      });
      const response = await data.json();
      if (response.status === "success") {
        setOpenSnackBar(true);
        setLoading(false);
        return;
      }
      if (response.error.keyValue.email) {
        setEmailError("Email already exists.");
        setLoading(false);
        return;
      }
      if (response.error.errors.email.name === "ValidatorError") {
        setEmailError("Please enter a valid email.");
        setLoading(false);
        return;
      }
      if (response.error.errors.password.name === "ValidatorError") {
        setPasswordError("Password must be at least 8 characters long.");
        setLoading(false);
        return;
      }
      if (response.error.errors.confirmPassword.name === "ValidatorError") {
        setConfirmPasswordError("Passwords do not match.");
        setLoading(false);
        return;
      }
      setLoading(false);
      return;
    } catch (error) {
      setLoading(false);
      return;
    }
  }, [name, email, password, confirmPassword]);

  function goToLogin() {
    navigate("/auth/login");
  }

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    handleRegistration,
    emailError,
    passwordError,
    confirmPasswordError,
    nameError,
    goToLogin,
    openSnackBar,
  };
};

export default useHandleRegistration;
