// ... الاستيرادات نفسها ...
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

      if (!error) {
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

  const filteredListings = allListings.filter((listing) => {
    const isVisible = listing.status === "published" || listing.status === "pending";
    const matchesSearch =
      (listing.title ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (listing.description ?? "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || listing.ad_type === filterType;
    const matchesLocation =
      !filterLocation ||
      (listing.location ?? "").toLowerCase().includes(filterLocation.toLowerCase());

    return isVisible && matchesSearch && matchesType && matchesLocation;
  });

  const paginatedAds = filteredListings.slice(0, visiblePage * adsPerPage);

  const loadNextPage = () => {
    setVisiblePage((prev) => prev + 1);
  };

  const handleWhatsAppContact = (phoneNumber, itemTitle, type) => {
    const message = `مرحبًا، رأيت إعلان "${itemTitle}" (${type === "lost" ? "مفقود" : "موجود"}) على منصة L9itha DZ وأرغب بالتواصل.`;
    const url = `https://wa.me/${phoneNumber?.replace(/\s+/g, "").replace("+", "")}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
  <div className="min-h-screen bg-background text-foreground">
    <Navigation />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">جميع الإعلانات</h1>

      {/* 🔍 الفلاتر */}
      {/* ... كود الفلاتر كما هو ... */}

      {isLoading ? (
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-[5px] border-primary border-t-transparent mx-auto mb-4" />
          <p className="text-muted-foreground">جاري تحميل الإعلانات...</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-6 text-center">
            عرض {paginatedAds.length} من أصل {filteredListings.length} إعلان
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedAds.map((listing) => (
              <Card key={listing.id} className="hover:shadow-md transition bg-card text-card-foreground border">
                {/* 🖼️ صورة الإعلان */}
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
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      listing.ad_type === "lost"
                        ? "bg-destructive/20 text-destructive"
                        : "bg-primary/10 text-primary"
                    }`}>
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

                  <Button
                    onClick={() =>
                      handleWhatsAppContact(
                        listing.contact_numberer || listing.contactNumber || "",
                        listing.title,
                        listing.ad_type
                      )
                    }
                    className="w-full bg-primary hover:bg-primary/80 text-primary-foreground"
                    size="sm"
                  >
                    تواصل عبر واتساب
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 🟡 لا توجد نتائج */}
          {filteredListings.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-muted-foreground mb-4">لا توجد نتائج</h3>
              <p className="text-sm text-muted-foreground mb-6">
                جرب تغيير معايير البحث أو الفلترة
              </p>
              <AnimatedLinkButton to="/submit">
                أضف إعلان جديد
              </AnimatedLinkButton>
            </div>
          )}

          {/* ✅ زر "التالي" */}
          {paginatedAds.length < filteredListings.length && (
            <div className="text-center mt-8">
              <Button
                onClick={loadNextPage}
                className="bg-algeria-green-600 hover:bg-algeria-green-700 text-white px-6 py-3 rounded-lg"
              >
                التالي
              </Button>
            </div>
          )}
        </>
      )}
    </div>
    <Footer />
  </div>
);
};

export default Listings;
