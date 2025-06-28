
import { supabase } from "@/supabaseClient";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Submit = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const initialType = searchParams.get('type') || 'lost';
  
  const [formData, setFormData] = useState({
    type: initialType,
    itemName: '',
    description: '',
    location: '',
    date: '',
    contactNumber: '',
    image: null as File | null
  });

  const algerianWilayas = [
    'الجزائر العاصمة', 'وهران', 'قسنطينة', 'عنابة', 'البليدة', 'باتنة', 'سطيف', 'سيدي بلعباس',
    'بسكرة', 'تلمسان', 'أدرار', 'الشلف', 'الأغواط', 'أم البواقي', 'باتنة', 'بجاية',
    'بسكرة', 'بشار', 'البليدة', 'البويرة', 'تمنراست', 'جيجل', 'الجلفة', 'خنشلة',
    'العربي بن مهيدي', 'ولايات أخرى'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "خطأ في الصورة",
          description: "حجم الصورة يجب أن يكون أقل من 5 ميجابايت",
          variant: "destructive"
        });
        return;
      }
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    
    // Basic validation
    if (!formData.itemName || !formData.description || !formData.location || !formData.date || !formData.contactNumber) {
      toast({
        title: "خطأ في النموذج",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    // Phone number validation (simple)
    const phoneRegex = /^(\+213|0)[0-9]{9}$/;
    if (!phoneRegex.test(formData.contactNumber.replace(/\s/g, ''))) {
      toast({
        title: "خطأ في رقم الهاتف",
        description: "يرجى إدخال رقم هاتف صحيح (مثال: +213 555 123 456)",
        variant: "destructive"
      });
      return;
    }

    // Here you would normally send the data to a backend
    const { error } = await supabase.from("ads").insert([
  {
    title: formData.itemName,
    description: formData.description,
    ad_type: formData.type,
    location: formData.location,
    date: formData.date,
    contact_number: formData.contactNumber,
    image_url: null,
    status: "pending",
    created_at: new Date().toISOString()
  }
]);

if (error) {
  toast({
    title: "فشل الإرسال",
    description: "تعذّر حفظ الإعلان. حاول لاحقاً.",
    variant: "destructive"
  });
  return;
}

    // Reset form
    setFormData({
      type: 'lost',
      itemName: '',
      description: '',
      location: '',
      date: '',
      contactNumber: '',
      image: null
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
                {/* Type Selection */}
                <div className="space-y-2">
                  <Label htmlFor="type">نوع الإعلان *</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الإعلان" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lost">شيء مفقود</SelectItem>
                      <SelectItem value="found">شيء موجود</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Item Name */}
                <div className="space-y-2">
                  <Label htmlFor="itemName">اسم الشيء *</Label>
                  <Input
                    id="itemName"
                    placeholder="مثال: محفظة، مفاتيح، هاتف، بطاقة هوية..."
                    value={formData.itemName}
                    onChange={(e) => handleInputChange('itemName', e.target.value)}
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">وصف مفصل *</Label>
                  <Textarea
                    id="description"
                    placeholder="اكتب وصفاً مفصلاً للشيء (اللون، الحجم، العلامات المميزة، المحتويات...)"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="min-h-[100px]"
                    required
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">الموقع/الولاية *</Label>
                  <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الولاية" />
                    </SelectTrigger>
                    <SelectContent>
                      {algerianWilayas.map(wilaya => (
                        <SelectItem key={wilaya} value={wilaya}>{wilaya}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <Label htmlFor="date">
                    {formData.type === 'lost' ? 'تاريخ الفقدان *' : 'تاريخ الإيجاد *'}
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    required
                  />
                </div>

                {/* Contact Number */}
                <div className="space-y-2">
                  <Label htmlFor="contactNumber">رقم الهاتف (واتساب) *</Label>
                  <Input
                    id="contactNumber"
                    type="tel"
                    placeholder="+213 555 123 456"
                    value={formData.contactNumber}
                    onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                    required
                  />
                  <p className="text-sm text-gray-500">
                    سيتم استخدام هذا الرقم للتواصل معك عبر واتساب
                  </p>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="image">صورة الشيء (اختيارية)</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-algeria-green-50 file:text-algeria-green-700 hover:file:bg-algeria-green-100"
                  />
                  <p className="text-sm text-gray-500">
                    إضافة صورة تساعد في التعرف على الشيء بسهولة أكبر (الحد الأقصى: 5 ميجابايت)
                  </p>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-algeria-green-500 hover:bg-algeria-green-600 text-white py-3 text-lg"
                >
                  نشر الإعلان
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Guidelines */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>نصائح مهمة</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li>• كن دقيقاً في الوصف لمساعدة الآخرين في التعرف على الشيء</li>
                <li>• أضف صورة واضحة إذا كان ذلك ممكناً</li>
                <li>• تأكد من صحة رقم هاتفك</li>
                <li>• لا تنشر معلومات شخصية أو حساسة</li>
                <li>• كن متفهماً ومتعاوناً مع المتصلين</li>
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
