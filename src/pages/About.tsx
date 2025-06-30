
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div
  className="min-h-screen bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: 'url("/0.png")',
    backgroundColor: 'hsl(var(--background))',
  }}
>

      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">من نحن</h1>
          
          {/* Hero Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-algeria-green-600">مرحباً بكم في L9itha DZ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-gray-700">
                L9itha DZ هي منصة جزائرية مجانية تهدف إلى مساعدة المواطنين في استرجاع أشيائهم المفقودة 
                وإعادة الأشياء الموجودة إلى أصحابها الحقيقيين. نؤمن بقوة التضامن والمساعدة المتبادلة 
                في المجتمع الجزائري.
              </p>
            </CardContent>
          </Card>

          {/* Mission Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-algeria-green-600">مهمتنا</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  نسعى إلى إنشاء جسر تواصل فعال بين الأشخاص الذين فقدوا أشياءهم والذين وجدوها، 
                  من خلال منصة سهلة الاستخدام ومتاحة للجميع مجاناً.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-algeria-green-600">رؤيتنا</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  أن نصبح المنصة الأولى في الجزائر لاسترجاع الأشياء المفقودة، وأن نساهم في بناء 
                  مجتمع متضامن يساعد بعضه البعض.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Values Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-algeria-green-600">قيمنا الأساسية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-algeria-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">التضامن</h3>
                  <p className="text-gray-600">نؤمن بقوة التضامن والتعاون بين أفراد المجتمع</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-algeria-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">الصدق</h3>
                  <p className="text-gray-600">نشجع على الصدق والأمانة في جميع التعاملات</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-algeria-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">الثقة</h3>
                  <p className="text-gray-600">نبني منصة آمنة وموثوقة للجميع</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-algeria-green-600">كيف نعمل؟</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-8 h-8 bg-algeria-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">أبلغ عن الشيء</h3>
                    <p className="text-gray-600">
                      سواء كنت قد فقدت شيئاً أو وجدت شيئاً، قم بنشر إعلان مفصل مع الوصف والصور
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-8 h-8 bg-algeria-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">تصفح الإعلانات</h3>
                    <p className="text-gray-600">
                      يمكن للآخرين البحث وتصفح الإعلانات للعثور على أشيائهم أو التعرف على أشياء وجدوها
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-8 h-8 bg-algeria-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">التواصل المباشر</h3>
                    <p className="text-gray-600">
                      عند العثور على الشيء، يمكن التواصل مباشرة مع صاحب الإعلان عبر واتساب
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-8 h-8 bg-algeria-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">إعادة الشيء</h3>
                    <p className="text-gray-600">
                      يتم ترتيب لقاء آمن لإعادة الشيء إلى صاحبه الحقيقي
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trust and Safety */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-algeria-green-600">الأمان والثقة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  نحن ملتزمون بضمان بيئة آمنة وموثوقة لجميع المستخدمين. لذلك ننصح بـ:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mr-4">
                  <li>اللقاء في أماكن عامة وآمنة عند تسليم الأشياء</li>
                  <li>التحقق من هوية الشخص قبل تسليم الأشياء الثمينة</li>
                  <li>عدم مشاركة معلومات شخصية حساسة في الإعلانات</li>
                  <li>الإبلاغ عن أي سلوك مشبوه أو غير مناسب</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-algeria-green-600">هل لديك أسئلة؟</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed mb-4">
                نحن هنا لمساعدتك! إذا كان لديك أي استفسار أو اقتراح لتحسين المنصة، 
                لا تتردد في التواصل معنا.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="bg-algeria-green-500 hover:bg-algeria-green-600 text-white px-6 py-3 rounded-lg text-center transition-colors"
                >
                  اتصل بنا
                </a>
                <a
                  href="https://wa.me/213563263186"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-center transition-colors"
                >
                  واتساب
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

export default About;
