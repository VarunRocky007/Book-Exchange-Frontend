import AuthenticationPage from "../modules/authentication/pages/AuthenticationPage";
import HomePage from "../modules/home/pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import CreateBookEntryPage from "../modules/create-book-entry/pages/CreateBookEntryPage";
import ProfilePage from "../modules/profile/pages/ProfilePage";
import ChangePasswordPage from "../modules/profile/pages/ChangePasswordPage";
import BookDetailsPage from "../modules/detail-book-view/pages/BookDetailsPage";
import SearchPage from "../modules/search/pages/SearchPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-book-entry" element={<CreateBookEntryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/book/:id" element={<BookDetailsPage />} />
          <Route path="/search" element={<SearchPage />} />
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
