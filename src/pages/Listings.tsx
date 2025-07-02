import { useEffect, useState } from "react";
import { supabase } from "/supabaseClient";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import AnimatedLinkButton from "@/components/AnimatedLinkButton";

const Listings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterLocation, setFilterLocation] = useState("");
  const [allListings, setAllListings] = useState([]);
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visiblePage, setVisiblePage] = useState(1);
  const adsPerPage = 12;

  useEffect(() => {
    const fetchAds = async () => {
      const { data, error } = await supabase
        .from("ads")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
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
  }, []);

  const extractPhoneNumber = (raw) => String(raw || "").replace(/\D+/g, "");

  const handleWhatsAppContact = (phoneNumber, itemTitle, type) => {
    const clean = extractPhoneNumber(phoneNumber);
    if (!clean) return;
    const msg = `مرحبًا، رأيت إعلان "${itemTitle}" (${type === "lost" ? "مفقود" : "موجود"}) على منصة L9itha DZ وأرغب بالتواصل.`;
    const url = `https://wa.me/${clean}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  const handlePhoneCall = (phoneNumber) => {
    const clean = extractPhoneNumber(phoneNumber);
    if (!clean) return;
    window.open(`tel:${clean}`);
  };

  const filteredListings = allListings.filter((listing) => {
    const isVisible = listing.status === "published";
    const matchesSearch =
      (listing.title ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (listing.description ?? "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || listing.ad_type === filterType;
    const matchesLocation =
      !filterLocation ||
      (listing.location ?? "").toLowerCase().includes(filterLocation.toLowerCase());
    return isVisible && matchesSearch && matchesType && matchesLocation;
  });

  const slicedListings = filteredListings.slice(0, visiblePage * adsPerPage);

    return (
    <div
      className="relative min-h-screen bg-fixed bg-cover bg-center bg-no-repeat text-foreground"
      style={{
        backgroundImage: 'url("/09.jpg")',
        backgroundColor: "hsl(var(--background))",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-0" />
      <div className="relative z-10">
        <Navigation />

        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold text-center mb-10 text-primary drop-shadow-md">
            جميع الإعلانات
          </h1>

          {/* 🔍 الفلاتر */}
          <div className="rounded-xl border border-border shadow-xl bg-white/70 dark:bg-black/30 backdrop-blur-md p-6 mb-10">
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

                    {isLoading ? (
            <div className="text-center py-16">
              <div className="animate-spin h-10 w-10 border-[5px] border-primary border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-muted-foreground">جاري تحميل الإعلانات...</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-white/80 mb-6 text-center drop-shadow">
                عرض {slicedListings.length} من أصل {filteredListings.length} إعلان
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {slicedListings.map((listing) => (
                  <Card
                    key={listing.id}
                    className="hover:shadow-xl transition border bg-white/70 dark:bg-black/40 backdrop-blur-md"
                  >
                    <CardHeader className="p-0">
                      {listing.image_url ? (
                        <img
                          src={listing.image_url}
                          alt={listing.title}
                          className="w-full h-48 object-cover rounded-t-md"
                        />
                      ) : (
                        <div className="w-full h-48 bg-muted flex items-center justify-center text-muted-foreground text-sm">
                          🖼️ لا توجد صورة
                        </div>
                      )}
                    </CardHeader>

                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            listing.ad_type === "lost"
                              ? "bg-destructive/20 text-destructive"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          {listing.ad_type === "lost" ? "مفقود" : "موجود"}
                        </span>

                        {listing.status === "pending" && (
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                            قيد المراجعة
                          </span>
                        )}
                      </div>

                      <CardTitle className="text-lg">{listing.title}</CardTitle>
                      <CardDescription>{listing.description}</CardDescription>

                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>📍 {listing.location}</p>
                        {listing.date && <p>📅 {listing.date}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <Button
                          onClick={() =>
                            handleWhatsAppContact(
                              listing.contact_numberer,
                              listing.title,
                              listing.ad_type
                            )
                          }
                          className="bg-green-600 hover:bg-green-700 text-white"
                          size="sm"
                        >
                          واتساب
                        </Button>
                        <Button
                          onClick={() => handlePhoneCall(listing.contact_numberer)}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          size="sm"
                        >
                          اتصال
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredListings.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-muted-foreground mb-4">
                    لا توجد نتائج
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    جرب تغيير معايير البحث أو الفلترة
                  </p>
                  <AnimatedLinkButton to="/submit">
                    أضف إعلان جديد
                  </AnimatedLinkButton>
                </div>
              )}

              {filteredListings.length > adsPerPage && (
                <div className="flex justify-center items-center gap-4 mt-10">
                  {visiblePage > 1 && (
                    <Button
                      onClick={() => setVisiblePage((prev) => prev - 1)}
                      className="bg-white/80 hover:bg-white text-primary px-6 py-2 rounded-lg"
                    >
                      السابق
                    </Button>
                  )}
                  {visiblePage * adsPerPage < filteredListings.length && (
                    <Button
                      onClick={() => setVisiblePage((prev) => prev + 1)}
                      className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/80"
                    >
                      التالي
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Listings;
