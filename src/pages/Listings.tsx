// Listings.jsx - الجزء الأول
import { useEffect, useState } from "react";
import { supabase } from "/supabaseClient";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Listings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterLocation, setFilterLocation] = useState("");
  const [allListings, setAllListings] = useState([]);
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [visibleCount, setVisibleCount] = useState(12); // ✅ بداية أكبر
  const pageSize = 6;

  useEffect(() => {
    const fetchAds = async () => {
      const { data, error } = await supabase
        .from("ads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("❌ Fetch error:", error.message);
      } else {
        setAllListings(data);
        const locSet = new Set();
        data.forEach((item) => {
          const loc = (item.location ?? "").trim();
          if (loc) locSet.add(loc);
        });
        setUniqueLocations([...locSet].sort());
      }

      setIsLoading(false);
    };

    fetchAds();

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisibleCount((prev) => prev + pageSize);
        }
      },
      { threshold: 0.5 } // ✅ أكثر مرونة
    );

    const target = document.querySelector("#load-more-trigger");
    if (target) observer.observe(target);

    return () => observer.disconnect();
  }, []);

    const filteredListings = allListings.filter((listing) => {
    const isVisible =
      listing.status === "published" || listing.status === "pending";
    const matchesSearch =
      (listing.title ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (listing.description ?? "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || listing.ad_type === filterType;
    const matchesLocation =
      !filterLocation ||
      (listing.location ?? "")
        .toLowerCase()
        .includes(filterLocation.toLowerCase());

    return isVisible && matchesSearch && matchesType && matchesLocation;
  });

  const slicedListings = filteredListings.slice(0, visibleCount);

  const handleWhatsAppContact = (phoneNumber, itemTitle, type) => {
    const message = `مرحبًا، رأيت إعلان "${itemTitle}" (${type === "lost" ? "مفقود" : "موجود"}) على منصة L9itha DZ وأرغب بالتواصل.`;
    const url = `https://wa.me/${phoneNumber?.replace(/\s+/g, "").replace("+", "")}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">جميع الإعلانات</h1>

        {/* 🔍 الفلاتر */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="ابحث عن شيء مفقود أو موجود..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger><SelectValue placeholder="نوع الإعلان" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الإعلانات</SelectItem>
                  <SelectItem value="lost">مفقود</SelectItem>
                  <SelectItem value="found">موجود</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Input
                list="locations"
                placeholder="اكتب اسم الولاية"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
              />
              <datalist id="locations">
                {uniqueLocations.map((loc) => (
                  <option key={loc} value={loc} />
                ))}
              </datalist>
            </div>
          </div>
        </div>

        {/* 🧾 النتائج */}
        {isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-[5px] border-green-500 border-t-transparent mx-auto mb-4" />
            <p className="text-gray-500">جاري تحميل الإعلانات...</p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">
              عرض {filteredListings.length} من أصل {allListings.length} إعلان
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {slicedListings.map((listing) => (
                <Card key={listing.id} className="hover:shadow-lg transition duration-300 transform hover:-translate-y-1">
                  <CardHeader className="p-0">
                    {listing.image_url ? (
                      <img src={listing.image_url} alt={listing.title} className="w-full h-48 object-cover rounded-t-lg" />
                    ) : (
                      <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">🖼️ لا توجد صورة</div>
                    )}
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${listing.ad_type === "lost" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                        {listing.ad_type === "lost" ? "مفقود" : "موجود"}
                      </span>
                      {listing.status === "pending" && (
                        <span className="text-xs text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">قيد المراجعة</span>
                      )}
                    </div>
                    <CardTitle className="text-lg mb-2">{listing.title}</CardTitle>
                    <CardDescription className="mb-4 leading-relaxed">{listing.description}</CardDescription>
                    <div className="text-sm text-gray-500 mb-4">
                      <p>📍 {listing.location}</p>
                      {listing.date && <p>📅 {listing.date}</p>}
                    </div>
                    <Button
                      onClick={() =>
                        handleWhatsAppContact(listing.contact_numberer || listing.contactNumber || "", listing.title, listing.ad_type)
                      }
                      className="w-full bg-green-500 hover:bg-green-600 text-white"
                      size="sm"
                    >
                      تواصل عبر واتساب
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* ⚠️ لا توجد نتائج */}
            {filteredListings.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-600 mb-4">لا توجد نتائج</h3>
                <p className="text-gray-500 mb-6">جرب تغيير معايير البحث أو الفلترة</p>
                <Button asChild><a href="/submit">أضف إعلان جديد</a></Button>
              </div>
            )}

            {/* 🔁 Scroll Loader */}
            {slicedListings.length < filteredListings.length && (
              <div id="load-more-trigger" className="py-12 text-center text-gray-400">تحميل المزيد...</div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Listings;
