
import AwesomeLoader from "./pages/AwesomeLoader";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 📄 صفحات رئيسية
import Landing from "./pages/Landing"; // ✅ الصفحة الجديدة
import Index from "./pages/Index";
import Listings from "./pages/Listings";
import Submit from "./pages/Submit";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Testimonials from "./pages/Testimonials";
import NotFound from "./pages/NotFound";
import AdsDashboard from "./pages/ads"; // أو المسار الصحيح حسب مشروعك


// 💬 مكونات عامة
import WhatsAppFloat from "./components/WhatsAppFloat";

// 🚀 تحويلات مرئية
import FancyRedirect from "./components/FancyRedirect";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* ✅ صفحة البداية الرسمية */}
          <Route path="/" element={<Landing />} />

          {/* 🔹 الروابط الفعلية للمحتوى */}
          <Route path="/home" element={<Index />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/loading" element={<AwesomeLoader />} />
          <Route path="/ads" element={<AdsDashboard />} />
         

          {/* 🔸 تحويلات مرئية سلسة */}
          <Route path="/go-to-home" element={<FancyRedirect to="/home" />} />
          <Route path="/go-to-listings" element={<FancyRedirect to="/listings" />} />
          <Route path="/go-to-submit" element={<FancyRedirect to="/submit" />} />
          <Route path="/go-to-about" element={<FancyRedirect to="/about" />} />
          <Route path="/go-to-contact" element={<FancyRedirect to="/contact" />} />
          <Route path="/go-to-testimonials" element={<FancyRedirect to="/testimonials" />} />
        </Routes>

        {/* 💬 زر واتساب العائم */}
        <WhatsAppFloat />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
