import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SignupPage from "../pages/SignupPage/SignupPage";
import CellPhoneHeader from "../components/CellPhoneHeader";
import CommentsPage from "../pages/CommentsPage/CommentsPage";

export default function Router() {
  return (
    <BrowserRouter>
    <CellPhoneHeader/>
      <Routes>
        <Route path="/posts" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/comments/:id" element={<CommentsPage/>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
