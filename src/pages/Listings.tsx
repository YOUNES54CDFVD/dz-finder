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
  const [filterLocation, setFilterLocation] = useState("all");
  const [allListings, setAllListings] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      const { data, error } = await supabase
        .from("ads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("❌ Fetch error:", error.message);
      } else {
        console.log("📦 بيانات Supabase:", data);
        setAllListings(data);
      }
    };

    fetchAds();
  }, []);

  const filteredListings = allListings.filter((listing) => {
    const matchesSearch =
      (listing.title ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (listing.description ?? "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesType = filterType === "all" || listing.type === filterType;
    const matchesLocation =
      filterLocation === "all" || listing.location === filterLocation;

    return matchesSearch && matchesType && matchesLocation;
  });

  const locations = [...new Set(allListings.map((l) => l.location))];

  const handleWhatsAppContact = (phoneNumber: string, itemTitle: string) => {
    const message = `مرحبا، أريد الاستفسار عن "${itemTitle}" المنشور في منصة L9itha DZ`;
    const whatsappUrl = `https://wa.me/${phoneNumber
      ?.replace(/\s+/g, "")
      .replace("+", "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          جميع الإعلانات
        </h1>

        {/* 🧠 البحث والفلاتر */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="ابحث عن الأشياء المفقودة أو الموجودة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="نوع الإعلان" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الإعلانات</SelectItem>
                  <SelectItem value="lost">مفقود</SelectItem>
                  <SelectItem value="found">موجود</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={filterLocation} onValueChange={setFilterLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="الموقع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المواقع</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* 🧾 عدد النتائج */}
        <div className="mb-6">
          <p className="text-gray-600">
            عرض {filteredListings.length} من أصل {allListings.length} إعلان
          </p>
        </div>

        {/* 🪧 شبكة الإعلانات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card
              key={listing.id}
              className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardHeader className="p-0">
                {listing.image || listing.image_url ? (
                  <img
                    src={listing.image || listing.image_url || "/fallback.jpg"}
                    alt={listing.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <span className="text-gray-500">لا توجد صورة</span>
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      listing.type === "lost"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {listing.type === "lost" ? "مفقود" : "موجود"}
                  </span>
                </div>
                <CardTitle className="text-lg mb-2">{listing.title}</CardTitle>
                <CardDescription className="mb-4 leading-relaxed">
                  {listing.description}
                </CardDescription>
                <div className="text-sm text-gray-500 mb-4">
                  <p>📍 {listing.location}</p>
                  <p>📅 {listing.date}</p>
                </div>
                <Button
                  onClick={() =>
                    handleWhatsAppContact(
                      listing.contact ||
                        listing.contactNumber ||
                        listing.contact_numberer,
                      listing.title
                    )
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

        {/* 🈳 حالة لا توجد نتائج */}
        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-600 mb-4">
              لا توجد نتائج
            </h3>
            <p className="text-gray-500 mb-6">
              جرب تغيير معايير البحث أو الفلترة
            </p>
            <Button asChild>
              <a href="/submit">أضف إعلان جديد</a>
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Listings;
