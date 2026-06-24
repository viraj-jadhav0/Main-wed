"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CallToAction } from "@/components/call-to-action"
import { useApp } from "@/components/app-provider"
import { t } from "@/lib/translations"
import { Flower2, Users, Award, Heart, Shield, Clock, Star, MapPin } from "lucide-react"

export default function AboutUsPage() {
  const { lang } = useApp()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {t.nav.aboutUs[lang]}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              {lang === "en" && "Preserving traditions, serving devotion since 2020"}
              {lang === "mr" && "परंपरा जपणारे, भक्ती सेवेत २०२० पासून"}
              {lang === "hi" && "परंपरा को संजोते हुए, भक्ति में सेवा २०२० से"}
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-3xl border border-border/60 bg-card/50 p-8 sm:p-12">
              <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
                {lang === "en" && "Our Story"}
                {lang === "mr" && "आमची कथा"}
                {lang === "hi" && "हमारी कहानी"}
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  {lang === "en" && "GurujiforPooja was founded with a simple mission: to make authentic Vedic rituals accessible to every household. We noticed that many families struggled to find learned, reliable pandits who could perform ceremonies with proper devotion and understanding of traditions."}
                  {lang === "mr" && "गुरुजीफॉरपूजा एका सोप्या उद्देशाने सुरू झाली: प्रत्येक घरात अस्सल वैदिक विधी पोहोचवणे. आम्हाला लक्षात आले की अनेक कुटुंबांना अनुभवी, विश्वासार्ह पंडित शोधणे अवघड होते जे योग्य भक्ती आणि परंपरांच्या समजाने सोहळे करू शकतील."}
                  {lang === "hi" && "गुरुजीफॉरपूजा की स्थापना एक सरल मिशन के साथ हुई: हर घर में प्रामाणिक वैदिक विधियों को पहुंचाना। हमें महसूस हुआ कि कई परिवारों को अनुभवी, विश्वसनीय पंडित ढूंढने में कठिनाई होती जो उचित भक्ति और परंपराओं की समझ के साथ समारोह कर सकें."}
                </p>
                <p>
                  {lang === "en" && "Today, we serve thousands of families across the region, performing everything from intimate Satyanarayan Poojas to grand wedding ceremonies. Our team of verified pandits are not just ritual performers — they are teachers who explain the meaning behind every mantra, helping families connect deeply with their faith."}
                  {lang === "mr" && "आज आम्ही प्रदेशभरातील हजारो कुटुंबांची सेवा करतो, ज्या लहान सत्यनारायण पूजांपासून ते मोठ्या विवाह सोहळ्यांपर्यंत आहेत. आमचे पडताळलेले पंडिट फक्त विधी करणारे नाहीत — ते शिक्षक आहेत जे प्रत्येक मंत्राचा अर्थ समजावून सांगतात, कुटुंबांना त्यांच्या श्रद्धेशी खोल जोड तयार करण्यास मदत करतात."}
                  {lang === "hi" && "आज हम क्षेत्र भर के हजारों परिवारों की सेवा करते हैं, जो छोटे सत्यनारायण पूजा से लेकर बड़े विवाह समारोह तक हैं। हमारे सत्यापित पंडित केवल विधि करने वाले नहीं हैं — वे शिक्षक हैं जो हर मंत्र के पीछे का अर्थ समझाते हैं, परिवारों को उनकी आस्था के साथ गहरा जुड़ाव बनाने में मदद करते हैं।"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-heading text-center text-3xl font-bold text-foreground sm:text-4xl">
              {lang === "en" && "Our Values"}
              {lang === "mr" && "आमची मूल्ये"}
              {lang === "hi" && "हमारे मूल्य"}
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-border/60 bg-card/50 p-6 text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Flower2 className="size-6" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">
                  {lang === "en" && "Authenticity"}
                  {lang === "mr" && "अस्सलता"}
                  {lang === "hi" && "प्रामाणिकता"}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {lang === "en" && "True Vedic traditions, no shortcuts"}
                  {lang === "mr" && "खरी वैदिक परंपरा, कोणतीही शॉर्टकट नाहीत"}
                  {lang === "hi" && "सच्ची वैदिक परंपरा, कोई शॉर्टकट नहीं"}
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card/50 p-6 text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Users className="size-6" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">
                  {lang === "en" && "Trust"}
                  {lang === "mr" && "विश्वास"}
                  {lang === "hi" && "विश्वास"}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {lang === "en" && "Verified pandits, transparent pricing"}
                  {lang === "mr" && "पडताळलेले पंडित, पारदर्शक किंमत"}
                  {lang === "hi" && "सत्यापित पंडित, पारदर्शी मूल्य"}
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card/50 p-6 text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Award className="size-6" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">
                  {lang === "en" && "Excellence"}
                  {lang === "mr" && "उत्कृष्टता"}
                  {lang === "hi" && "उत्कृष्टता"}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {lang === "en" && "Learned scholars, meticulous rituals"}
                  {lang === "mr" && "विद्वान विद्वान, सविस्तर विधी"}
                  {lang === "hi" && "विद्वान विद्वान, सावधानीपूर्वक विधियां"}
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card/50 p-6 text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Heart className="size-6" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">
                  {lang === "en" && "Devotion"}
                  {lang === "mr" && "भक्ती"}
                  {lang === "hi" && "भक्ति"}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {lang === "en" && "Every ceremony performed with heart"}
                  {lang === "mr" && "प्रत्येक सोहळा हृदयाने केला जातो"}
                  {lang === "hi" && "हर समारोह दिल से किया जाता है"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-heading text-center text-3xl font-bold text-foreground sm:text-4xl">
              {lang === "en" && "Why Choose Us"}
              {lang === "mr" && "आम्हाला का निवडावे"}
              {lang === "hi" && "हमें क्यों चुनें"}
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-border/60 bg-card/50 p-6">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Shield className="size-6" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">
                  {lang === "en" && "Verified Pandits"}
                  {lang === "mr" && "पडताळलेले पंडित"}
                  {lang === "hi" && "सत्यापित पंडित"}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {lang === "en" && "All our pandits are background verified and trained in authentic Vedic rituals."}
                  {lang === "mr" && "आमचे सर्व पंडित पार्श्वभूमी पडताळलेले आणि अस्सल वैदिक विधींमध्ये प्रशिक्षित आहेत."}
                  {lang === "hi" && "हमारे सभी पंडित पृष्ठभूमि सत्यापित और प्रामाणिक वैदिक विधियों में प्रशिक्षित हैं."}
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card/50 p-6">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Clock className="size-6" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">
                  {lang === "en" && "On-Time Service"}
                  {lang === "mr" && "वेळेवर सेवा"}
                  {lang === "hi" && "समय पर सेवा"}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {lang === "en" && "We respect your time and ensure punctual arrival for every ceremony."}
                  {lang === "mr" && "आम्ही तुमचा वेळ मानडतो आणि प्रत्येक सोहळ्यासाठी वेळेवर आगमन सुनिश्चित करतो."}
                  {lang === "hi" && "हम आपके समय का सम्मान करते हैं और हर समारोह के लिए समय पर आगमन सुनिश्चित करते हैं."}
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card/50 p-6">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Star className="size-6" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">
                  {lang === "en" && "Quality Samagri"}
                  {lang === "mr" && "गुणवत्तापूर्ण साहित्य"}
                  {lang === "hi" && "गुणवत्ता सामग्री"}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {lang === "en" && "Premium quality pooja materials sourced from trusted suppliers."}
                  {lang === "mr" && "विश्वासार्ह पुरवठादारांकडून आलेली प्रीमियम गुणवत्तेची पूजा सामग्री."}
                  {lang === "hi" && "विश्वसनीय आपूर्तिकर्ताओं से प्राप्त प्रीमियम गुणवत्ता वाली पूजा सामग्री."}
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card/50 p-6">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="size-6" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">
                  {lang === "en" && "Pan-India Service"}
                  {lang === "mr" && "संपूर्ण भारतात सेवा"}
                  {lang === "hi" && "पूरे भारत में सेवा"}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {lang === "en" && "Available across major cities with expanding network."}
                  {lang === "mr" && "विस्तारण नेटवर्कसह प्रमुख शहरांमध्ये उपलब्ध."}
                  {lang === "hi" && "विस्तारित नेटवर्क के साथ प्रमुख शहरों में उपलब्ध।"}
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card/50 p-6">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Users className="size-6" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">
                  {lang === "en" && "24/7 Support"}
                  {lang === "mr" && "२४/७ समर्थन"}
                  {lang === "hi" && "२४/७ सहायता"}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {lang === "en" && "Dedicated customer support available round the clock."}
                  {lang === "mr" && "दिवसभर उपलब्ध विशेष ग्राहक समर्थन."}
                  {lang === "hi" && "दिन भर उपलब्ध समर्पित ग्राहक सहायता।"}
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card/50 p-6">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Award className="size-6" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">
                  {lang === "en" && "Fair Pricing"}
                  {lang === "mr" && "उचित किंमत"}
                  {lang === "hi" && "उचित मूल्य"}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {lang === "en" && "Transparent pricing with no hidden charges or surprises."}
                  {lang === "mr" && "कोणतेही लपवलेले शुल्क किंवा आश्चर्य नसलेली पारदर्शक किंमत."}
                  {lang === "hi" && "कोई छिपी शुल्क या आश्चर्य के बिना पारदर्शी मूल्य निर्धारण।"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 rounded-3xl border border-border/60 bg-card/50 p-8 sm:grid-cols-3 sm:p-12">
              <div className="text-center">
                <div className="font-heading text-4xl font-bold text-primary sm:text-5xl">5000+</div>
                <div className="mt-2 text-muted-foreground">
                  {lang === "en" && "Ceremonies Performed"}
                  {lang === "mr" && "पार पडलेले सोहळे"}
                  {lang === "hi" && "संपन्न समारोह"}
                </div>
              </div>
              <div className="text-center">
                <div className="font-heading text-4xl font-bold text-primary sm:text-5xl">50+</div>
                <div className="mt-2 text-muted-foreground">
                  {lang === "en" && "Verified Pandits"}
                  {lang === "mr" && "पडताळलेले पंडित"}
                  {lang === "hi" && "सत्यापित पंडित"}
                </div>
              </div>
              <div className="text-center">
                <div className="font-heading text-4xl font-bold text-primary sm:text-5xl">4.9</div>
                <div className="mt-2 text-muted-foreground">
                  {lang === "en" && "Customer Rating"}
                  {lang === "mr" && "ग्राहक रेटिंग"}
                  {lang === "hi" && "ग्राहक रेटिंग"}
                </div>
              </div>
            </div>
          </div>
        </section>

        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}
