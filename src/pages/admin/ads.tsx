import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Button } from "@/components/ui/button";

// 👤 بيانات تسجيل الدخول من متغيرات البيئة
const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USER;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASS;

const AdsDashboard = () => {
  const [ads, setAds] = useState<any[]>([]);
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  // 📦 جلب الإعلانات من Supabase
  const fetchAds = async () => {
    const { data, error } = await supabase
      .from("ads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ خطأ أثناء جلب الإعلانات:", error.message);
    } else {
      setAds(data || []);
    }
  };

  // ⏳ تحميل الإعلانات عند الدخول
  useEffect(() => {
    if (auth) fetchAds();
  }, [auth]);

  // ✅ تحديث الحالة (نشر / رفض)
  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("ads").update({ status }).eq("id", id);
    if (error) {
      console.error("❌ فشل في تحديث الحالة:", error.message);
    } else {
      fetchAds();
    }
  };

  // 🗑 حذف الإعلان
  const deleteAd = async (id: string) => {
    const { error } = await supabase.from("ads").delete().eq("id", id);
    if (error) {
      console.error("❌ فشل في حذف الإعلان:", error.message);
    } else {
      fetchAds();
    }
  };

  // 🔐 تحقق من بيانات تسجيل الدخول
  const handleLogin = () => {
    if (user === ADMIN_USERNAME && pass === ADMIN_PASSWORD) {
      setAuth(true);
    } else {
      alert("❌ اسم المستخدم أو كلمة المرور غير صحيحة");
    }
  };

  // 🔒 واجهة تسجيل الدخول
  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-sm space-y-4 text-right">
          <h2 className="text-2xl font-bold text-algeria-green-700 mb-4">
            دخول المشرف
          </h2>
          <input
            type="text"
            placeholder="اسم المستخدم"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            onChange={(e) => setPass(e.target.value)}
          />
          <Button
            className="w-full bg-algeria-green-700 hover:bg-algeria-green-800 text-white"
            onClick={handleLogin}
          >
            دخول
          </Button>
        </div>
      </div>
    );
  }

  // 📋 لوحة الإعلانات بعد الدخول
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-right text-algeria-green-800">
        لوحة التحكم – الإعلانات
      </h1>

      {ads.length === 0 ? (
        <p className="text-center text-gray-500">لا توجد إعلانات حالياً</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className="border rounded-lg p-4 bg-white shadow-sm space-y-2 text-right"
            >
              <h2 className="text-lg font-semibold text-algeria-green-700">
                {ad.title}
              </h2>
              <p className="text-gray-600">{ad.description}</p>
              <p className="text-sm text-muted-foreground">
                الحالة:{" "}
                <span className="font-medium text-gray-800">{ad.status}</span>
              </p>

              <div className="flex gap-2 mt-2 flex-wrap">
                <Button onClick={() => updateStatus(ad.id, "published")}>
                  ✅ نشر
                </Button>
                <Button
                  variant="outline"
                  onClick={() => updateStatus(ad.id, "rejected")}
                >
                  ❌ رفض
                </Button>
                <Button variant="destructive" onClick={() => deleteAd(ad.id)}>
                  🗑 حذف
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdsDashboard;
