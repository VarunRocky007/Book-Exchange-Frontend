import { Navigate, Outlet } from "react-router-dom";
import Cookie from "js-cookie";
import { useCallback, useEffect, useState } from "react";

const ProtectedRoute = () => {
  const [isLoading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkToken = useCallback(async () => {
    const token = Cookie.get("authToken");

    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/users/detail",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const res = await response.json();

      if (res.data.user != null) {
        setLoading(false);
        setIsAuthenticated(true);
      } else {
        setLoading(false);
        setIsAuthenticated(false);
        Cookie.remove("authToken");
      }
    } catch (error) {
      setLoading(false);
      setIsAuthenticated(false);
      Cookie.remove("authToken");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return isAuthenticated ? <Outlet /> : <Navigate to="/auth/login" />;
  }
};

export default ProtectedRoute;
