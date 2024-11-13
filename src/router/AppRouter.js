import AuthenticationPage from "../modules/authentication/pages/AuthenticationPage";
import HomePage from "../modules/home/pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import CreateBookEntryPage from "../modules/create-book-entry/pages/CreateBookEntryPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-book-entry" element={<CreateBookEntryPage />} />
        </Route>
        <Route
          path="/auth/login"
          element={<AuthenticationPage type="login" />}
        />
        <Route
          path="/auth/register"
          element={<AuthenticationPage type="register" />}
        />
        <Route
          path="/auth/forgot-password"
          element={<AuthenticationPage type="forgot-password" />}
        />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
