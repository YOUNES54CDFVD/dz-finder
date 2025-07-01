import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Button } from "@/components/ui/button";

const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USER;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASS;

type AdStatus = "pending" | "published" | "rejected";

interface Ad {
  id: string;
  title: string;
  description: string;
  status: AdStatus;
  image_url?: string;
}

const AdsDashboard = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [filter, setFilter] = useState<AdStatus>("pending");

  // 📦 جلب الإعلانات من Supabase
  const fetchAds = async () => {
    const { data, error } = await supabase
      .from("ads")
      .select("id, title, description, status, image_url")
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

  // ✅ تحديث حالة الإعلان
  const updateStatus = async (id: string, status: AdStatus) => {
    const { error } = await supabase.from("ads").update({ status }).eq("id", id);
    if (error) {
      console.error("❌ فشل في تحديث الحالة:", error.message);
    } else {
      // إزالة الإعلان مباشرة من الواجهة
      setAds((prev) => prev.filter((ad) => ad.id !== id));
    }
  };

  // 🗑 حذف الإعلان
  const deleteAd = async (id: string) => {
    const { error } = await supabase.from("ads").delete().eq("id", id);
    if (error) {
      console.error("❌ فشل في حذف الإعلان:", error.message);
    } else {
      setAds((prev) => prev.filter((ad) => ad.id !== id));
    }
  };

  // 🔐 تحقق من بيانات الدخول
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

  // 📋 عرض الإعلانات بعد تسجيل الدخول
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-right text-algeria-green-800">
        لوحة التحكم – الإعلانات
      </h1>

      {/* ✅ أزرار الفلترة */}
      <div className="flex justify-end gap-3 mb-6 flex-wrap">
        {(["pending", "published", "rejected"] as AdStatus[]).map((s) => (
          <Button
            key={s}
            variant={filter === s ? "default" : "outline"}
            onClick={() => setFilter(s)}
          >
            {s === "pending" && "📥 المعلّقة"}
            {s === "published" && "✅ المنشورة"}
            {s === "rejected" && "❌ المرفوضة"}
          </Button>
        ))}
      </div>

      {/* ✅ عرض الإعلانات */}
      {ads.filter((ad) => ad.status === filter).length === 0 ? (
        <p className="text-center text-gray-500">
          لا توجد إعلانات {filter === "pending" ? "معلّقة" : filter === "published" ? "منشورة" : "مرفوضة"} حالياً
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ads
            .filter((ad) => ad.status === filter)
            .map((ad) => (
              <div
                key={ad.id}
                className="border rounded-lg overflow-hidden bg-white shadow-sm flex flex-col"
              >
                {ad.image_url && (
                  <img
                    src={ad.image_url}
                    alt="صورة الإعلان"
                    className="w-full h-52 object-cover"
                  />
                )}

                <div className="p-4 space-y-2 text-right flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-algeria-green-700">
                      {ad.title}
                    </h2>
                    <p className="text-gray-600 text-sm">{ad.description}</p>
                  </div>

                  <div className="flex gap-2 mt-4 flex-wrap justify-end">
                    {filter === "pending" && (
                      <>
                        <Button
                          onClick={() => updateStatus(ad.id, "published")}
                        >
                          ✅ نشر
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => updateStatus(ad.id, "rejected")}
                        >
                          ❌ رفض
                        </Button>
                      </>
                    )}
                    <Button
                      variant="destructive"
                      onClick={() => deleteAd(ad.id)}
                    >
                      🗑 حذف
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default AdsDashboard;
