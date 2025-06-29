import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 📄 صفحاتك الرئيسية
import Index from "./pages/Index";
import Listings from "./pages/Listings";
import Submit from "./pages/Submit";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Testimonials from "./pages/Testimonials";
import NotFound from "./pages/NotFound";

// 💬 مكوّنات عامة
import WhatsAppFloat from "./components/WhatsAppFloat";

// 🚀 مسارات التحويل البصري
import FancyRedirect from "./components/FancyRedirect";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* 🔹 الروابط الأصلية */}
          <Route path="/" element={<Index />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="*" element={<NotFound />} />

          {/* 🔸 روابط التوجيه بـ Fade + Loading */}
          <Route path="/go-to-home" element={<FancyRedirect to="/" />} />
          <Route path="/go-to-listings" element={<FancyRedirect to="/listings" />} />
          <Route path="/go-to-submit" element={<FancyRedirect to="/submit" />} />
          <Route path="/go-to-about" element={<FancyRedirect to="/about" />} />
          <Route path="/go-to-contact" element={<FancyRedirect to="/contact" />} />
          <Route path="/go-to-testimonials" element={<FancyRedirect to="/testimonials" />} />
        </Routes>
        <WhatsAppFloat />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
