import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "./supabaseClient";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Submit = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const initialType = searchParams.get("type") || "lost";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [formData, setFormData] = useState({
    type: initialType,
    itemName: "",
    description: "",
    location: "",
    date: "",
    contactNumber: "",
    image: null as File | null,
  });

  const wilayas = [
    "الجزائر العاصمة", "وهران", "قسنطينة", "عنابة", "البليدة", "باتنة", "سطيف", "سيدي بلعباس",
    "بسكرة", "تلمسان", "أدرار", "الشلف", "الأغواط", "أم البواقي", "بجاية", "بشار", "البويرة",
    "تمنراست", "جيجل", "الجلفة", "خنشلة", "العربي بن مهيدي", "ولايات أخرى"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "خطأ في الصورة",
          description: "الحجم كبير جدًا",
          variant: "destructive",
        });
        return;
      }
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const playSuccessSound = () => {
    const audio = new Audio("/sounds/successed.mp3");
    audio.play().catch(() => {});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { itemName, description, location, date, contactNumber, image, type } = formData;

    if (!itemName || !description || !location || !date || !contactNumber) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const phoneRegex = /^(\+213|0)[0-9]{9}$/;
    if (!phoneRegex.test(contactNumber.replace(/\s/g, ""))) {
      toast({
        title: "رقم غير صحيح",
        description: "مثال: +213 555 123 456",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    let imageUrl: string | null = null;
    if (image) {
      const fileName = `${Date.now()}-${image.name}`;
      const { error: uploadError } = await supabase.storage
        .from("ads-images")
        .upload(fileName, image);

      if (uploadError) {
        toast({
          title: "فشل رفع الصورة",
          description: uploadError.message,
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      const { data: publicUrl } = supabase.storage
        .from("ads-images")
        .getPublicUrl(fileName);

      imageUrl = publicUrl?.publicUrl || null;
    }

    const { error } = await supabase.from("ads").insert([{
      title: itemName,
      description,
      ad_type: type,
      location,
      date,
      contact_numberer: contactNumber,
      image_url: imageUrl,
      status: "pending",
      created_at: new Date().toISOString(),
    }]);

    if (error) {
      toast({
        title: "فشل الإرسال",
        description: error.message,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    playSuccessSound();
    setShowSuccessPopup(true);
    setFormData({
      type: "lost",
      itemName: "",
      description: "",
      location: "",
      date: "",
      contactNumber: "",
      image: null,
    });

    setTimeout(() => setShowSuccessPopup(false), 4000);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-primary">أضف إعلان جديد</h1>

          <Card>
            <CardHeader>
              <CardTitle>معلومات الإعلان</CardTitle>
              <CardDescription>يرجى ملء جميع الحقول بدقة</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label>نوع الإعلان</Label>
                  <Select value={formData.type} onValueChange={(v) => handleInputChange("type", v)}>
                    <SelectTrigger><SelectValue placeholder="نوع الإعلان" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lost">مفقود</SelectItem>
                      <SelectItem value="found">موجود</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>اسم الشيء</Label>
                  <Input value={formData.itemName} onChange={(e) => handleInputChange("itemName", e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label>الوصف</Label>
                  <Textarea
                    className="min-h-[100px]"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>الموقع (الولاية)</Label>
                  <Select value={formData.location} onValueChange={(v) => handleInputChange("location", v)}>
                    <SelectTrigger><SelectValue placeholder="اختر الولاية" /></SelectTrigger>
                    <SelectContent>
                      {wilayas.map((w) => (
                        <SelectItem key={w} value={w}>
                          {w}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>التاريخ</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>رقم الهاتف</Label>
                  <Input
                    type="tel"
                    value={formData.contactNumber}
                    onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>الصورة (اختياري)</Label>
                  <Input type="file" accept="image/*" onChange={handleImageChange} />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/80 text-primary-foreground py-3 text-lg"
                >
                  {isSubmitting ? "📤 جارٍ النشر..." : "نشر الإعلان"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* ✅ لودينغ */}
          {isSubmitting && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-card text-card-foreground p-6 rounded-lg shadow-lg text-center">
                <div className="animate-spin h-8 w-8 mx-auto mb-3 border-4 border-accent border-t-transparent rounded-full" />
                <p className="font-medium">جاري معالجة الإعلان...</p>
              </div>
            </div>
          )}

          {/* ✅ رسالة نجاح */}
          {showSuccessPopup && (
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-6 py-4 rounded-lg shadow-lg z-50 text-center space-y-2"> <p>🎉 تم نشر إعلانك بنجاح!</p> <button onClick={() => { playSuccessSound(); setShowSuccessPopup(false); }} className="mt-1 px-4 py-1 bg-white text-primary font-semibold rounded hover:bg-muted transition" > حسناً، جميل </button> </div> )}

</div> </div>

<Footer /> </div> ); };

export default Submit;
