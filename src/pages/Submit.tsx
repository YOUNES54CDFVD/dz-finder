import { supabase } from "./supabaseClient";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Submit = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const initialType = searchParams.get("type") || "lost";

  const [formData, setFormData] = useState({
    type: initialType,
    itemName: "",
    description: "",
    location: "",
    date: "",
    contactNumber: "",
    image: null as File | null,
  });

  const algerianWilayas = [
    "الجزائر العاصمة", "وهران", "قسنطينة", "عنابة", "البليدة", "باتنة", "سطيف", "سيدي بلعباس",
    "بسكرة", "تلمسان", "أدرار", "الشلف", "الأغواط", "أم البواقي", "بجاية",
    "بشار", "البويرة", "تمنراست", "جيجل", "الجلفة", "خنشلة",
    "العربي بن مهيدي", "ولايات أخرى",
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
          description: "حجم الصورة يجب أن يكون أقل من 5 ميجابايت",
          variant: "destructive",
        });
        return;
      }
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { itemName, description, location, date, contactNumber, image, type } = formData;

    if (!itemName || !description || !location || !date || !contactNumber) {
      toast({
        title: "خطأ في النموذج",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const phoneRegex = /^(\+213|0)[0-9]{9}$/;
    if (!phoneRegex.test(contactNumber.replace(/\s/g, ""))) {
      toast({
        title: "خطأ في رقم الهاتف",
        description: "يرجى إدخال رقم هاتف صحيح (مثال: +213 555 123 456)",
        variant: "destructive",
      });
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
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("ads-images")
        .getPublicUrl(fileName);
      imageUrl = publicUrlData?.publicUrl || null;
    }

    const { error } = await supabase.from("ads").insert([
      {
        title: itemName,
        description,
        ad_type: type,
        location,
        date,
        contact_numberer: contactNumber,
        image_url: imageUrl,
        status: "pending",
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("❌ Supabase Error:", error);
      toast({
        title: "فشل الإرسال",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "🎉 تم الإعلان بنجاح!",
      description: "شكراً لك على نشر إعلانك. سيتم مراجعته قريباً.",
      variant: "success",
    });

    setFormData({
      type: "lost",
      itemName: "",
      description: "",
      location: "",
      date: "",
      contactNumber: "",
      image: null,
    });
  };
    return (
    <div className="min-h-screen bg-gradient-bg">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">أضف إعلان جديد</h1>
          <Card>
            <CardHeader>
              <CardTitle>معلومات الإعلان</CardTitle>
              <CardDescription>
                يرجى ملء جميع المعلومات بدقة لمساعدة الآخرين في التعرف على الشيء
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* نوع الإعلان */}
                <div className="space-y-2">
                  <Label>نوع الإعلان *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleInputChange("type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الإعلان" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lost">مفقود</SelectItem>
                      <SelectItem value="found">موجود</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* اسم الشيء */}
                <div className="space-y-2">
                  <Label>اسم الشيء *</Label>
                  <Input
                    placeholder="مثال: محفظة، مفاتيح، هاتف..."
                    value={formData.itemName}
                    onChange={(e) => handleInputChange("itemName", e.target.value)}
                  />
                </div>

                {/* وصف */}
                <div className="space-y-2">
                  <Label>الوصف *</Label>
                  <Textarea
                    placeholder="أضف وصفاً دقيقاً للشيء المفقود أو الموجود"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                {/* الموقع */}
                <div className="space-y-2">
                  <Label>الموقع (الولاية) *</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) => handleInputChange("location", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الولاية" />
                    </SelectTrigger>
                    <SelectContent>
                      {algerianWilayas.map((wilaya) => (
                        <SelectItem key={wilaya} value={wilaya}>
                          {wilaya}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* التاريخ */}
                <div className="space-y-2">
                  <Label>التاريخ *</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                  />
                </div>

                {/* رقم الهاتف */}
                <div className="space-y-2">
                  <Label>رقم الهاتف (واتساب) *</Label>
                  <Input
                    type="tel"
                    placeholder="+213 555 123 456"
                    value={formData.contactNumber}
                    onChange={(e) => handleInputChange("contactNumber", e.target.value)}
                  />
                  <p className="text-sm text-gray-500">
                    سيتم استخدام هذا الرقم فقط للتواصل حول الإعلان
                  </p>
                </div>

                {/* تحميل صورة */}
                <div className="space-y-2">
                  <Label>صورة (اختيارية)</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-algeria-green-50 file:text-algeria-green-700 hover:file:bg-algeria-green-100"
                  />
                  <p className="text-sm text-gray-500">
                    يمكنك إضافة صورة واحدة (الحد الأقصى: 5 ميجابايت)
                  </p>
                </div>

                {/* زر إرسال */}
                <Button
                  type="submit"
                  className="w-full bg-algeria-green-500 hover:bg-algeria-green-600 text-white py-3 text-lg"
                >
                  نشر الإعلان
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* نصائح وإرشادات */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>نصائح مهمة</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li>• كن دقيقاً في وصف الشيء</li>
                <li>• أضف صورة إن أمكن لتسريع التعرف</li>
                <li>• لا تنس التحقق من صحة رقم الهاتف</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Submit;
