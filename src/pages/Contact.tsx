import { useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import AnimatedLinkButton from "@/components/AnimatedLinkButton";
import ScrollReveal from "@/components/ScrollReveal"; // ✅ انميشن ديناميكي
import BlobBackground from "@/components/BlobBackground"; // ✅ خلفية مضيئة

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "خطأ في النموذج",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "خطأ في البريد الإلكتروني",
        description: "يرجى إدخال بريد إلكتروني صحيح",
        variant: "destructive",
      });
      return;
    }

    console.log("Contact form submitted:", formData);
    toast({
      title: "تم إرسال الرسالة بنجاح!",
      description: "سنتواصل معك قريباً",
    });

    setFormData({ name: "", email: "", message: "" });
  };

    return (
    <div className="relative min-h-screen bg-gradient-bg">
      <BlobBackground />
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="down">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
              اتصل بنا
            </h1>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ScrollReveal direction="left">
              <Card>
                <CardHeader>
                  <CardTitle>أرسل لنا رسالة</CardTitle>
                  <CardDescription>
                    نحن نقدر آراءكم واقتراحاتكم لتحسين المنصة
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم الكامل *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">رسالتك *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        className="min-h-[120px]"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-algeria-green-500 hover:bg-algeria-green-600 text-white"
                    >
                      إرسال الرسالة
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* معلومات التواصل */}
            <div className="space-y-6">
              <ScrollReveal direction="up" delay={0.1}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      📱 واتساب
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      للتواصل السريع والحصول على الدعم الفوري
                    </p>
                    <a
                      href="https://wa.me/213555123456?text=مرحبا"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      تواصل عبر واتساب
                    </a>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      📧 البريد الإلكتروني
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      للاستفسارات والدعم التقني
                    </p>
                    <a
                      href="mailto:info@l9itha-dz.com"
                      className="text-algeria-green-600 hover:text-algeria-green-700 font-medium"
                    >
                      info@l9itha-dz.com
                    </a>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.5}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      🌐 وسائل التواصل
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      تابعنا للحصول على التحديثات
                    </p>
                    <div className="flex gap-4">{/* أيقونات السوشيال */}</div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.7}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      ❓ الأسئلة الشائعة
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      ربما تجد إجابة سؤالك هنا
                    </p>
                    <AnimatedLinkButton to="/about" variant="outline">
                      اقرأ المزيد عن المنصة
                    </AnimatedLinkButton>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
