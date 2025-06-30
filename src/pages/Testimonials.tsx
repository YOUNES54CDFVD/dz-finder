import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { supabase } from "/supabaseClient";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // 🟢 تحميل التقييمات من القاعدة
  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .in("status", ["pending", "published"])
        .order("created_at", { ascending: false });

      if (!error && data) {
        setTestimonials(data);
      }
    };

    fetchTestimonials();
  }, []);

    const handleSubmit = async () => {
    if (!rating || !comment) return;
    setSubmitting(true);

    const { data, error } = await supabase.from("testimonials").insert({
      name: "زائر مجهول",
      rating,
      text: comment,
      status: "pending",
    }).select();

    if (!error && data) {
      // ✅ أضف التقييم الجديد مباشرة في الأعلى
      setTestimonials((prev) => [data[0], ...prev]);
    }

    setTimeout(() => {
      setSubmitting(false);
      setDialogOpen(false);
      setRating(0);
      setComment("");
    }, 1500);
  };

  const renderStars = (value: number) => {
    return [...Array(5)].map((_, i) => {
      const current = i + 1;
      return (
        <svg
          key={i}
          onClick={() => setRating(current)}
          onMouseEnter={() => setHoverRating(current)}
          onMouseLeave={() => setHoverRating(0)}
          className={`w-8 h-8 cursor-pointer transition ${
            current <= (hoverRating || rating)
              ? "text-yellow-400"
              : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      );
    });
  };

    return (
    <div className="min-h-screen bg-gradient-bg">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">تقييمات المستخدمين</h1>
          <p className="text-gray-600 mt-2 mb-6">
            شارك قصتك وساهم في بناء الثقة والمجتمع
          </p>

          {/* زر ونافذة إضافة تقييم */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-algeria-green-600 hover:bg-algeria-green-700 text-white px-6 py-3">
                ✨ أضف تقييمك
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg text-right">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">أضف تقييمك</h2>
              <div className="flex justify-center mb-4">{renderStars(rating)}</div>
              <Textarea
                placeholder="اكتب تعليقك هنا..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mb-4"
              />
              <Button
                disabled={submitting || !rating || !comment}
                onClick={handleSubmit}
                className="w-full bg-algeria-green-600 hover:bg-algeria-green-700 text-white"
              >
                {submitting ? (
                  <span className="animate-pulse">جارٍ الإرسال...</span>
                ) : (
                  "إرسال التقييم"
                )}
              </Button>
            </DialogContent>
          </Dialog>

          {/* التقييمات */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {testimonials.map((t, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-algeria-green-600">
                    {t.name || "مستخدم"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-1">{renderStars(t.rating)}</div>
                  <blockquote className="italic text-muted-foreground">
                    "{t.text}"
                  </blockquote>
                  {t.status === "pending" && (
                    <p className="text-sm text-yellow-500">⏳ قيد المراجعة</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Testimonials;
