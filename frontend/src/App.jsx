import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "sonner";
import { HelmetProvider } from "react-helmet-async"; // Import HelmetProvider

// Public layouts & pages
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import Rescue from "./pages/Rescue"; // Check if this page is still in use, it's not in routes
import VolunteerModal from "./components/VolunteerModal";
import AdminLogin from "./pages/Admin/AdminLogin";
import Forbidden from "./pages/Forbidden";

// Admin protected pages
import AdminHome from "./pages/Admin/AdminHome";
import AdminDonations from "./pages/Admin/AdminDonations";
import AdminRescues from "./pages/Admin/AdminRescues"; // Check if this page is still in use, it's not in routes
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import GalleryPage from "./components/GalleryPage";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import AdminInquiries from "./pages/Admin/AdminInquiry";
import BackToTopButton from "./components/BackToTopButton";
// import FloatingButton from "./components/FloatingButton"; // Check if this is used, often WhatsApp button replaces it
import AdminAddDog from "./pages/Admin/AdminAddDog"; // Check if this page is still in use, it's not in routes
import AdoptionEnquiry from "./pages/AdoptionEnquiry"; // Check if this page is still in use, it's not in routes
import AdminAdoptionInquiries from "./pages/Admin/AdminAdoptionEnquiries"; // Check if this page is still in use, it's not in routes
import Compliance from "./pages/Compliance";
import OurWorkPage from "./pages/OurWorkPage";
import AdminManageAdoption from "./components/AdminManageAdoption"; // Check if this page is still in use, it's not in routes
import VolunteerInquiry from "./pages/Admin/VolunteerInquiry";

// 🔥 NEW 404 PAGE
import NotFound from "./pages/NotFound";
import OurImpactPage from "./pages/OurImpact";
import Blog from "./pages/Blog";
import HowToHelp from "./pages/HowToHelp";
import EmergencyRescue from "./pages/EmergencyRescue";
import FAQs from "./pages/FAQs";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Define all known public routes for better 404 handling.
  // This list should be exhaustive for public-facing paths that use Layout.
  // We'll also consider dynamic paths if you have them (e.g., /blog/:slug)
  const knownPublicRoutes = [
    "/",
    "/about",
    "/contact",
    "/donate",
    "/gallery",
    "/our-work",
    "/compliance",
    "/our-impact",
    "/blog",
    "/report-abuse",
    "/emergency-rescue",
    "/faqs",
    "/privacy-policy",
    "/terms-of-service",
    // Add any other public routes here
  ];

  // A more robust check for 404 that also considers trailing slashes.
  const isNotFoundPage =
    !knownPublicRoutes.includes(location.pathname.replace(/\/+$/, "")) &&
    !isAdminRoute;

  return (
    <>
      {!isAdminRoute && !isNotFoundPage && <VolunteerModal />}
      <ScrollToTop />
      {/* FloatingButton is often your WhatsApp button, if so, keep it here
      {!isAdminRoute && <FloatingButton />} */}

      <Routes>
        {/* Public routes inside main layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/our-work" element={<OurWorkPage />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/our-impact" element={<OurImpactPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/report-abuse" element={<HowToHelp />} />
          <Route path="/emergency-rescue" element={<EmergencyRescue />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          {/* Add more public routes here */}
        </Route>
        {/* Admin auth routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<Forbidden />} />{" "}
        {/* Keep Forbidden for now */}
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
          <Route path="inquiries" element={<AdminInquiries />} />
          <Route path="donations" element={<AdminDonations />} />
          <Route path="volunteer-inquiries" element={<VolunteerInquiry />} />
          {/* Add other admin sub-routes here */}
          {/* Example of commented-out routes if not used: */}
          {/* <Route path="rescues" element={<AdminRescues />} /> */}
          {/* <Route path="add-dog" element={<AdminAddDog />} /> */}
          {/* <Route path="adoption-inquiries" element={<AdminAdoptionInquiries />} /> */}
          {/* <Route path="manage-adoption" element={<AdminManageAdoption />} /> */}
        </Route>
        {/* 🔥 Catch-all 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster richColors position="top-right" />
      {!isAdminRoute && <Footer />}
      <BackToTopButton />
    </>
  );
}

function App() {
  return (
    <Router>
      <HelmetProvider>
        {" "}
        {/* Wrap your entire app with HelmetProvider */}
        <AppContent />
      </HelmetProvider>
    </Router>
  );
}

export default App;
