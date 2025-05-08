import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "sonner";

// Public layouts & pages
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import Rescue from "./pages/Rescue";

// Admin authentication page
import AdminLogin from "./pages/Admin/AdminLogin";
import Forbidden from "./pages/Forbidden"; // 🔒 Replaces register

// Admin protected pages
import AdminHome from "./pages/Admin/AdminHome";
import AdminDonations from "./pages/Admin/AdminDonations";
import AdminRescues from "./pages/Admin/AdminRescues";

// Protected route wrapper & layout
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import GalleryPage from "./components/GalleryPage";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import AdminInquiries from "./pages/Admin/AdminInquiry";
import BackToTopButton from "./components/BackToTopButton";
import PawTrail from "./components/PawTrail";

import FloatingButton from "./components/FloatingButton";
import AdminAddDog from "./pages/Admin/AdminAddDog";
import AdoptionEnquiry from "./pages/AdoptionEnquiry";
import AdminAdoptionInquiries from "./pages/Admin/AdminAdoptionEnquiries";
import OurWorkPage from "./pages/OurWorkPage";

function App() {
  return (
    <Router>
      <FloatingButton />
      <ScrollToTop />
      <PawTrail />

      <Routes>
        {/* Public routes inside main layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/adopt" element={<Rescue />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/our-work" element={<OurWorkPage />} />

          <Route path="/adoption-enquiry" element={<AdoptionEnquiry />} />
        </Route>
        {/* Admin auth routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<Forbidden />} />{" "}
        {/* 🔒 Protected */}
        {/* Admin protected routes inside AdminLayout */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="/admin/inquiries" element={<AdminInquiries />} />
          <Route path="donations" element={<AdminDonations />} />
          <Route path="rescues" element={<AdminRescues />} />
          <Route path="add-adoption" element={<AdminAddDog />} />
          <Route
            path="/admin/adoption-inquiries"
            element={<AdminAdoptionInquiries />}
          />
        </Route>
        {/* Catch-all route to redirect to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Global toast notifications */}
      <Toaster richColors position="top-right" />
      <Footer />
      <BackToTopButton />
    </Router>
  );
}

export default App;
