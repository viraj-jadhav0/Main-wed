export type Language = "en" | "mr" | "hi"

export const languages: { code: Language; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "hi", label: "Hindi", native: "हिंदी" },
]

type Dict = Record<Language, string>

export const t = {
  brand: { en: "GurujiforPooja", mr: "GurujiforPooja", hi: "GurujiforPooja" } as Dict,
  bookNow: { en: "Book Now", mr: "बुक करा", hi: "बुक करें" } as Dict,
  nav: {
    services: { en: "Services", mr: "सेवा", hi: "सेवाएं" } as Dict,
    whyUs: { en: "Why Us", mr: "का आम्ही", hi: "क्यों हम" } as Dict,
    howItWorks: { en: "How It Works", mr: "कसे चालते", hi: "कैसे काम करता है" } as Dict,
    faq: { en: "FAQ", mr: "प्रश्न", hi: "प्रश्न" } as Dict,
    aboutUs: { en: "About Us", mr: "आमच्याबद्दल", hi: "हमारे बारे में" } as Dict,
  },
  hero: {
    tagline: { en: "Trusted Spiritual Services", mr: "विश्वासार्ह आध्यात्मिक सेवा", hi: "विश्वसनीय आध्यात्मिक सेवाएं" } as Dict,
    heading: {
      en: "Your Faith, Our Responsibility",
      mr: "तुमचा विश्वास, आमची जबाबदारी",
      hi: "आपकी आस्था, हमारी जिम्मेदारी",
    } as Dict,
    description: {
      en: "Experienced, learned pandits for every pooja and ceremony — performed with authentic Vedic traditions, devotion and care, right at your home.",
      mr: "प्रत्येक पूजा व सोहळ्यासाठी अनुभवी, विद्वान पंडित — अस्सल वैदिक परंपरेनुसार, भक्ती व काळजीने, तुमच्या घरीच.",
      hi: "हर पूजा व समारोह के लिए अनुभवी, विद्वान पंडित — प्रामाणिक वैदिक परंपरा, भक्ति व देखभाल के साथ, आपके घर पर.",
    } as Dict,
    cta: { en: "Book a Pooja", mr: "पूजा बुक करा", hi: "पूजा बुक करें" } as Dict,
    secondaryCta: { en: "Explore Services", mr: "सेवा पहा", hi: "सेवाएं देखें" } as Dict,
  },
  categories: {
    heading: { en: "Our Services", mr: "आमच्या सेवा", hi: "हमारी सेवाएं" } as Dict,
    subheading: {
      en: "Choose from a wide range of ceremonies, poojas and ritual essentials.",
      mr: "विविध सोहळे, पूजा व पूजा साहित्यातून निवडा.",
      hi: "विभिन्न समारोह, पूजा व पूजा सामग्री में से चुनें.",
    } as Dict,
    events: { en: "Events", mr: "सोहळे", hi: "आयोजन" } as Dict,
    pooja: { en: "Pooja", mr: "पूजा", hi: "पूजा" } as Dict,
    sahitya: { en: "Pooja Sahitya", mr: "पूजा साहित्य", hi: "पूजा सामग्री" } as Dict,
    viewDetails: { en: "View Details", mr: "तपशील पहा", hi: "विवरण देखें" } as Dict,
  },
  whyUs: {
    heading: { en: "Why Choose Us", mr: "का निवडावे आम्हाला", hi: "हमें क्यों चुनें" } as Dict,
    subheading: {
      en: "Devotion, authenticity and convenience in every service we offer.",
      mr: "आमच्या प्रत्येक सेवेत भक्ती, अस्सलता व सुविधा.",
      hi: "हमारी हर सेवा में भक्ति, प्रामाणिकता व सुविधा.",
    } as Dict,
    items: [
      {
        title: { en: "Experienced Pandits", mr: "अनुभवी पंडित", hi: "अनुभवी पंडित" } as Dict,
        desc: {
          en: "Learned, verified pandits well-versed in Vedic scriptures and rituals.",
          mr: "वेद व विधींमध्ये पारंगत, पडताळलेले विद्वान पंडित.",
          hi: "वेद व विधियों में निपुण, सत्यापित विद्वान पंडित.",
        } as Dict,
      },
      {
        title: { en: "Authentic Rituals", mr: "अस्सल विधी", hi: "प्रामाणिक विधियां" } as Dict,
        desc: {
          en: "Every ceremony performed exactly as per traditional Vedic procedures.",
          mr: "प्रत्येक सोहळा पारंपरिक वैदिक पद्धतीनुसार.",
          hi: "हर समारोह पारंपरिक वैदिक पद्धति के अनुसार.",
        } as Dict,
      },
      {
        title: { en: "At Your Doorstep", mr: "तुमच्या दारी", hi: "आपके द्वार पर" } as Dict,
        desc: {
          en: "Pandits and complete samagri arranged and delivered to your location.",
          mr: "पंडित व संपूर्ण साहित्य तुमच्या ठिकाणी पोहोचवले जाते.",
          hi: "पंडित व संपूर्ण सामग्री आपके स्थान पर पहुँचाई जाती है.",
        } as Dict,
      },
      {
        title: { en: "Transparent Pricing", mr: "पारदर्शक दर", hi: "पारदर्शी मूल्य" } as Dict,
        desc: {
          en: "Clear, fair pricing with no hidden costs for every ceremony.",
          mr: "प्रत्येक सोहळ्यासाठी स्पष्ट, योग्य व लपवलेले शुल्क नसलेले दर.",
          hi: "हर समारोह के लिए स्पष्ट, उचित व बिना छिपी लागत वाला मूल्य.",
        } as Dict,
      },
    ],
  },
  howItWorks: {
    heading: { en: "How It Works", mr: "कसे चालते", hi: "कैसे काम करता है" } as Dict,
    subheading: {
      en: "Booking your pooja is simple and stress-free.",
      mr: "तुमची पूजा बुक करणे सोपे व निश्चिंत आहे.",
      hi: "अपनी पूजा बुक करना सरल व चिंता-मुक्त है.",
    } as Dict,
    steps: [
      {
        title: { en: "Choose a Service", mr: "सेवा निवडा", hi: "सेवा चुनें" } as Dict,
        desc: {
          en: "Browse our poojas and ceremonies and pick what you need.",
          mr: "आमच्या पूजा व सोहळ्यांमधून तुमची गरज निवडा.",
          hi: "हमारी पूजा व समारोहों में से अपनी आवश्यकता चुनें.",
        } as Dict,
      },
      {
        title: { en: "Book a Date", mr: "तारीख बुक करा", hi: "तिथि बुक करें" } as Dict,
        desc: {
          en: "Tell us your preferred date, time and location.",
          mr: "तुमची पसंतीची तारीख, वेळ व ठिकाण सांगा.",
          hi: "अपनी पसंदीदा तिथि, समय व स्थान बताएं.",
        } as Dict,
      },
      {
        title: { en: "We Prepare", mr: "आम्ही तयारी करतो", hi: "हम तैयारी करते हैं" } as Dict,
        desc: {
          en: "We assign a pandit and arrange all required samagri.",
          mr: "आम्ही पंडित नियुक्त करतो व सर्व साहित्याची व्यवस्था करतो.",
          hi: "हम पंडित नियुक्त करते हैं व सभी सामग्री की व्यवस्था करते हैं.",
        } as Dict,
      },
      {
        title: { en: "Ceremony Performed", mr: "सोहळा पार पडतो", hi: "समारोह संपन्न" } as Dict,
        desc: {
          en: "Relax while the rituals are performed with devotion.",
          mr: "भक्तीभावाने विधी पार पडत असताना निश्चिंत राहा.",
          hi: "भक्ति भाव से विधियां संपन्न होते समय निश्चिंत रहें.",
        } as Dict,
      },
    ],
  },
  popular: {
    heading: { en: "Popular Services", mr: "लोकप्रिय सेवा", hi: "लोकप्रिय सेवाएं" } as Dict,
    subheading: {
      en: "Our most requested poojas and ceremonies.",
      mr: "सर्वाधिक मागणी असलेल्या पूजा व सोहळे.",
      hi: "सर्वाधिक मांग वाली पूजा व समारोह.",
    } as Dict,
  },
  testimonials: {
    heading: { en: "What Devotees Say", mr: "भक्त काय म्हणतात", hi: "भक्त क्या कहते हैं" } as Dict,
    subheading: {
      en: "Trusted by thousands of families across the region.",
      mr: "प्रदेशभरातील हजारो कुटुंबांचा विश्वास.",
      hi: "क्षेत्र भर के हजारों परिवारों का विश्वास.",
    } as Dict,
    items: [
      {
        name: "Anil Deshmukh",
        text: {
          en: "The pandit ji was punctual, knowledgeable and made our Satyanarayan pooja truly memorable.",
          mr: "पंडितजी वेळेवर, ज्ञानी होते आणि आमची सत्यनारायण पूजा खरोखर संस्मरणीय केली.",
          hi: "पंडित जी समय पर, ज्ञानी थे और हमारी सत्यनारायण पूजा को सच में यादगार बनाया.",
        } as Dict,
      },
      {
        name: "Priya Sharma",
        text: {
          en: "Booking was effortless and the complete samagri arrived on time. Highly recommended!",
          mr: "बुकिंग सोपे होते आणि संपूर्ण साहित्य वेळेवर आले. अत्यंत शिफारस!",
          hi: "बुकिंग आसान थी और संपूर्ण सामग्री समय पर पहुंची. अत्यधिक अनुशंसित!",
        } as Dict,
      },
      {
        name: "Rajesh Patil",
        text: {
          en: "Our Griha Pravesh was perfect. Every ritual was explained with patience and devotion.",
          mr: "आमचा गृहप्रवेश परिपूर्ण होता. प्रत्येक विधी संयमाने व भक्तीने समजावली.",
          hi: "हमारा गृह प्रवेश उत्तम रहा. हर विधि धैर्य व भक्ति से समझाई गई.",
        } as Dict,
      },
    ],
  },
  cta: {
    heading: { en: "Book Your Pooja Today", mr: "आजच तुमची पूजा बुक करा", hi: "आज ही अपनी पूजा बुक करें" } as Dict,
    desc: {
      en: "Let us handle the rituals with devotion while you focus on what matters — your family and faith.",
      mr: "तुम्ही कुटुंब व श्रद्धेवर लक्ष द्या, विधींची काळजी आम्ही भक्तीने घेतो.",
      hi: "आप परिवार व आस्था पर ध्यान दें, विधियों की देखभाल हम भक्ति से करते हैं.",
    } as Dict,
    button: { en: "Book Now", mr: "बुक करा", hi: "बुक करें" } as Dict,
    call: { en: "Call 9356273613", mr: "कॉल 9356273613", hi: "कॉल 9356273613" } as Dict,
  },
  faq: {
    heading: { en: "Frequently Asked Questions", mr: "वारंवार विचारले जाणारे प्रश्न", hi: "अक्सर पूछे जाने वाले प्रश्न" } as Dict,
    items: [
      {
        q: { en: "How do I book a pooja?", mr: "मी पूजा कशी बुक करू?", hi: "मैं पूजा कैसे बुक करूं?" } as Dict,
        a: {
          en: "Choose a service, click Book Now, and share your date, time and location. We confirm and arrange everything.",
          mr: "सेवा निवडा, बुक करा क्लिक करा आणि तारीख, वेळ व ठिकाण सांगा. आम्ही सर्व व्यवस्था करतो.",
          hi: "सेवा चुनें, बुक करें प�� क्लिक करें और तिथि, समय व स्थान बताएं. हम सब व्यवस्था करते हैं.",
        } as Dict,
      },
      {
        q: { en: "Do you provide the pooja samagri?", mr: "तुम्ही पूजा साहित्य पुरवता का?", hi: "क्या आप पूजा सामग्री देते हैं?" } as Dict,
        a: {
          en: "Yes, we can arrange complete samagri for any ceremony, or you can order our ready pooja sahitya sets.",
          mr: "होय, आम्ही कोणत्याही सोहळ्यासाठी संपूर्ण साहित्य पुरवतो किंवा तयार संच मागवू शकता.",
          hi: "हां, हम किसी भी समारोह के लिए संपूर्ण सामग्री देते हैं या तैयार सेट मंगा सकते हैं.",
        } as Dict,
      },
      {
        q: { en: "Are the pandits experienced?", mr: "पंडित अनुभवी आहेत का?", hi: "क्या पंडित अनुभवी हैं?" } as Dict,
        a: {
          en: "All our pandits are verified, learned in Vedic scriptures and have years of experience performing rituals.",
          mr: "आमचे सर्व पंडित पडताळलेले, वेदज्ञ व अनेक वर्षांचा अनुभव असलेले आहेत.",
          hi: "हमारे सभी पंडित सत्यापित, वेदज्ञ व वर्षों के अनुभव वाले हैं.",
        } as Dict,
      },
      {
        q: { en: "Which languages are supported?", mr: "कोणत्या भाषा समर्थित आहेत?", hi: "कौन सी भाषाएं समर्थित हैं?" } as Dict,
        a: {
          en: "Our pandits perform rituals and explain mantras in Hindi, Marathi and English.",
          mr: "आमचे पंडित हिंदी, मराठ��� व इंग्रजीत विधी व मंत्र समजावतात.",
          hi: "हमारे पंडित हिंदी, मराठी व अंग्रेजी में विधि व मंत्र समझाते हैं.",
        } as Dict,
      },
    ],
  },
  footer: {
    tagline: {
      en: "Authentic Vedic poojas and ceremonies, performed with devotion at your doorstep.",
      mr: "अस्सल वैदिक पूजा व सोहळे, भक्तीभावाने तुमच्या दारी.",
      hi: "प्रामाणिक वैदिक पूजा व समारोह, भक्ति भाव से आपके द्वार पर.",
    } as Dict,
    services: { en: "Services", mr: "सेवा", hi: "सेवाएं" } as Dict,
    links: { en: "Quick Links", mr: "लिंक्स", hi: "लिंक्स" } as Dict,
    contact: { en: "Contact", mr: "संपर्क", hi: "संपर्क" } as Dict,
    rights: { en: "All rights reserved.", mr: "सर्व हक्क राखीव.", hi: "सर्वाधिकार सुरक्षित." } as Dict,
  },
  detail: {
    about: { en: "About this service", mr: "या सेवेबद्दल", hi: "इस सेवा के बारे में" } as Dict,
    includes: { en: "What's included", mr: "काय समाविष्ट आहे", hi: "क्या शामिल है" } as Dict,
    duration: { en: "Duration", mr: "कालावधी", hi: "अवधि" } as Dict,
    startingFrom: { en: "Starting from", mr: "पासून सुरू", hi: "से शुरू" } as Dict,
    back: { en: "Back to services", mr: "सेवांकडे परत", hi: "सेवाओं पर वापस" } as Dict,
  },
}
