"use client";
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
import ScrollReveal from "@/components/ScrollReveal";
import BlobBackground from "@/components/BlobBackground";

const Contact = () => {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const res = await fetch("https://formspree.io/f/xnnvwdbw", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    setSending(false);

    if (res.ok) {
      toast({
        title: "✅ تم إرسال الرسالة بنجاح!",
        description: "سنتواصل معك قريباً",
      });
      form.reset();
    } else {
      toast({
        title: "خطأ أثناء الإرسال",
        description: "يرجى المحاولة مرة أخرى لاحقاً",
        variant: "destructive",
      });
    }
  };

    return (
    <div className="relative min-h-screen bg-gradient-bg">
      <BlobBackground />
      <Navigation />

      <div className="container mx-auto px-4 py-12">
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
                      <Input id="name" name="name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني *</Label>
                      <Input id="email" name="email" type="email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">رسالتك *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        className="min-h-[120px]"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-algeria-green-500 hover:bg-algeria-green-600 text-white"
                      disabled={sending}
                    >
                      {sending ? "جاري الإرسال..." : "إرسال الرسالة"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* ✅ قسم معلومات التواصل */}
            <div className="space-y-6">
              <ScrollReveal direction="up" delay={0.1}>
                <Card>
                  <CardHeader>
                    <CardTitle>📱 واتساب</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      للتواصل السريع والدعم الفوري
                    </p>
                    <a
                      href="https://wa.me/213555123456?text=مرحبا"
                      target="_blank"
                      className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition"
                    >
                      تواصل عبر واتساب
                    </a>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <Card>
                  <CardHeader>
                    <CardTitle>📧 البريد الإلكتروني</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      لأي استفسار أو دعم تقني
                    </p>
                    <a
                      href="mailto:info@l9itha-dz.com"
                      className="text-algeria-green-600 hover:underline"
                    >
                      info@l9itha-dz.com
                    </a>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.5}>
                <Card>
                  <CardHeader>
                    <CardTitle>🌐 وسائل التواصل</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      تابعنا للبقاء على اطلاع
                    </p>
                    <div className="flex gap-3">
                      {/* social icons placeholder */}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.7}>
                <Card>
                  <CardHeader>
                    <CardTitle>❓ الأسئلة الشائعة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      قد تجد إجابة سؤالك هنا
                    </p>
                    <AnimatedLinkButton to="/about" variant="outline">
                      تعرف على المنصة
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
