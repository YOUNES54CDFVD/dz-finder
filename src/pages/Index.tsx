import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "/supabaseClient";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import FadeInOnScroll from "@/components/FadeInOnScroll";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Listing {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  ad_type: "lost" | "found";
  image_url?: string;
}

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;

}

const Index = () => {
  const [recentListings, setRecentListings] = useState<Listing[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // 🔄 جلب آخر الإعلانات
  useEffect(() => {
    const fetchRecentListings = async () => {
      const { data, error } = await supabase
        .from("ads")
        .select("*")
        .in("status", ["published", "pending"])
        .order("created_at", { ascending: false })
        .limit(3);

      if (!error && data) {
        setRecentListings(data);
      } else {
        console.error("🔴 خطأ في جلب الإعلانات:", error);
      }
    };

    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("id, name, text, rating")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setTestimonials(data);
      } else {
        console.error("🔴 خطأ في جلب التقييمات:", error);
      }
    };

    fetchRecentListings();
    fetchTestimonials();
  }, []);

  return (
      <div
  className="min-h-screen bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: 'url("/09.jpg")',
    backgroundColor: 'hsl(var(--background))',
  }} 
  >
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            L9itha DZ
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            منصة مجانية للإبلاغ عن الأشياء المفقودة والموجودة في الجزائر <br />
            ساعد في إعادة الأشياء لأصحابها الحقيقيين
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-destructive text-white hover:bg-destructive/80 px-8 py-4 text-lg"
            >
              <Link to="/submit?type=lost">أبلغ عن شيء مفقود</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-muted px-8 py-4 text-lg"
            >
              <Link to="/submit?type=found">وجدت شيئاً</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Listings */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            آخر الإعلانات
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentListings.map((listing) => (
              <Card key={listing.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="p-0">
                  {listing.image_url ? (
                    <img
                      src={listing.image_url}
                      alt={listing.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  ) : (
                    <div className="w-full h-48 bg-muted flex items-center justify-center text-muted-foreground text-sm">
                      🖼️ لا توجد صورة
                    </div>
                  )}
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        listing.ad_type === "lost"
                          ? "bg-destructive/20 text-destructive"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {listing.ad_type === "lost" ? "مفقود" : "موجود"}
                    </span>
                  </div>
                  <CardTitle className="text-lg mb-2">{listing.title}</CardTitle>
                  <CardDescription className="mb-3">{listing.description}</CardDescription>
                  <div className="text-sm text-muted-foreground">
                    <p>{listing.location} • {listing.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg" className="text-primary hover:bg-muted">
              <Link to="/listings">عرض جميع الإعلانات</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-card text-card-foreground">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">ماذا يقول مستخدمونا</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="text-center">
                <CardContent className="p-6 flex flex-col items-center">
                  {testimonial.image_url && (
                    <img
                      src={testimonial.image_url}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mb-4"
                    />
                  )}
                  <div className="flex justify-center mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                 <p className="text-muted-foreground mb-3 italic">"{testimonial.text}"</p>
                  <h4 className="font-semibold text-primary">{testimonial.name}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-6">هل فقدت شيئاً أم وجدت شيئاً؟</h2>
          <p className="text-xl text-primary-foreground/80 mb-8">ساعدنا في إعادة الأشياء إلى أصحابها</p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-muted px-8 py-4 text-lg">
            <Link to="/submit">أضف إعلان الآن</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
