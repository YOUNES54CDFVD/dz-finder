
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "أحمد بن محمد",
      location: "الجزائر العاصمة",
      rating: 5,
      text: "استطعت استرجاع بطاقة هويتي بفضل هذه المنصة الرائعة. شخص كريم وجدها ونشر إعلاناً عنها. المنصة سهلة الاستخدام وفعالة جداً. شكراً جزيلاً لفريق L9itha DZ!",
      story: "فقدت بطاقة هويتي في محطة الحافلات، وبعد البحث عنها لأسبوع كامل، وجدت إعلاناً عنها في المنصة. تواصلت مع الشخص واسترجعتها في نفس اليوم."
    },
    {
      id: 2,
      name: "فاطمة الزهراء",
      location: "وهران",
      rating: 5,
      text: "منصة ممتازة ساعدتني في العثور على محفظتي المفقودة. الأشخاص في الجزائر طيبون وأمناء، والمنصة جعلت التواصل معهم سهلاً. أنصح الجميع باستخدامها.",
      story: "ضاعت محفظتي في السوق، وكانت تحتوي على مبلغ مهم وبطاقاتي المصرفية. بعد ثلاثة أيام، وجدت إعلاناً عنها هنا واسترجعت كل شيء سليماً."
    },
    {
      id: 3,
      name: "عمر العربي",
      location: "قسنطينة",
      rating: 5,
      text: "سهولة في الاستخدام وفعالية في النتائج. وجدت هاتف شخص ونشرت إعلاناً عنه، وخلال ساعات قليلة تواصل معي صاحبه. منصة تستحق الثناء والدعم.",
      story: "وجدت هاتفاً ذكياً في الحديقة العامة، ونشرت إعلاناً عنه. صاحب الهاتف كان سعيداً جداً لاسترجاعه، خاصة أنه كان يحتوي على صور عائلية مهمة."
    },
    {
      id: 4,
      name: "خديجة بوعلام",
      location: "سطيف",
      rating: 5,
      text: "فقدت مفاتيح بيتي وسيارتي، وكنت في حالة قلق شديد. بفضل هذه المنصة، استطاع شخص طيب أن يجدني ويعيد لي مفاتيحي. المنصة حقاً تخدم المجتمع.",
      story: "كانت المفاتيح تحتوي على ميدالية خاصة من والدتي المتوفاة. لم أكن أتوقع أن أجدها، لكن شخصاً كريماً وجدها ونشر عنها. لا يمكنني وصف فرحتي عندما استرجعتها."
    },
    {
      id: 5,
      name: "يوسف بن عيسى",
      location: "عنابة",
      rating: 5,
      text: "وجدت حقيبة تحتوي على أوراق مهمة وأردت إعادتها لصاحبها. المنصة ساعدتني في الوصول إليه بسرعة. أشعر بالسعادة لأنني ساعدت شخصاً آخر.",
      story: "الحقيبة كانت تحتوي على شهادات دراسية وأوراق عمل مهمة. صاحبها كان طالباً جامعياً، وكان سعيداً جداً لاسترجاعها قبل موعد التسجيل للامتحانات."
    },
    {
      id: 6,
      name: "زينب قادري",
      location: "تلمسان",
      rating: 5,
      text: "المنصة بسيطة ومفيدة جداً. ساعدتني في إيجاد ساعة والدي التي لها قيمة عاطفية كبيرة. شكراً لكم على هذه المبادرة الرائعة التي تجمع الناس الطيبين.",
      story: "الساعة كانت هدية من والدي قبل وفاته. فقدتها في المستشفى أثناء زيارة، وكنت محطمة. لكن ممرضة طيبة وجدتها ونشرت عنها، واستطعت استرجاعها."
    },
    {
      id: 7,
      name: "كريم بن صالح",
      location: "باتنة",
      rating: 5,
      text: "استخدمت المنصة لأول مرة عندما فقدت حقيبة كتبي الجامعية. لم أتوقع أن أجدها، لكن طالباً آخر وجدها ونشر عنها. الجزائريون أشخاص رائعون!",
      story: "كانت الحقيبة تحتوي على جميع مذكراتي ومشاريعي للسنة النهائية. فقدانها كان يعني خسارة سنة كاملة من العمل. الحمد لله استرجعتها والآن تخرجت بنجاح."
    },
    {
      id: 8,
      name: "نادية حمدي",
      location: "بجاية",
      rating: 5,
      text: "منصة رائعة تعكس روح التضامن في المجتمع الجزائري. ساعدتني في العثور على خاتم زواجي الذي فقدته في الشاطئ. الشخص الذي وجده رفض أخذ أي مكافأة!",
      story: "فقدت خاتم زواجي أثناء اللعب مع أطفالي في الشاطئ. كنت أبكي لأنه له ذكريات جميلة مع زوجي. شاب طيب وجده باستخدام جهاز الكشف عن المعادن ونشر عنه."
    }
  ];

  const renderStars = (rating: number) => {
    return [...Array(rating)].map((_, i) => (
      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
      </svg>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">تقييمات المستخدمين</h1>
          <p className="text-center text-gray-600 mb-12 text-lg">
            قصص حقيقية من أشخاص استطاعوا استرجاع أشيائهم أو مساعدة الآخرين
          </p>
          
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-algeria-green-600 mb-2">98%</div>
                <p className="text-gray-600">معدل الرضا</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-algeria-green-600 mb-2">500+</div>
                <p className="text-gray-600">شيء تم استرجاعه</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-algeria-green-600 mb-2">1000+</div>
                <p className="text-gray-600">مستخدم راضٍ</p>
              </CardContent>
            </Card>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-algeria-green-600">
                        {testimonial.name}
                      </CardTitle>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                    <div className="flex">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-gray-700 italic mb-4 leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>
                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-semibold text-gray-800 mb-2">القصة الكاملة:</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {testimonial.story}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <Card className="mt-12 algeria-gradient text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">هل لديك قصة نجاح مع منصتنا؟</h2>
              <p className="text-lg mb-6 opacity-90">
                شاركنا تجربتك وساعد في تشجيع الآخرين على استخدام المنصة
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-white text-algeria-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  شارك قصتك
                </a>
                <a
                  href="/submit"
                  className="bg-algeria-red-500 hover:bg-algeria-red-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                >
                  أضف إعلان جديد
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Testimonials;
