import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

const useHandleLoginHook = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleLogin = useCallback(
    () => async () => {
      if (username.trim() === "" || password.trim() === "") {
        setError("Please enter both username and password.");
        return;
      }
      setLoading(true);
      try {
        const data = await fetch("http://localhost:3000/api/v1/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: username,
            password: password,
          }),
        });
        const response = await data.json();
        if (response.error) {
          setError(response.error);
          setLoading(false);
          return;
        }
        setError("");
        setLoading(false);
        console.log(response);
        Cookie.set("authToken", response.token);
        console.log(response.token);
        navigate("/");
      } catch (error) {
        setError("Something went wrong. Please try again later.");
        setLoading(false);
        return;
      }
    },
    [username, password, navigate]
  );
  return {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
    loading,
    error,
  };
};

export default useHandleLoginHook;