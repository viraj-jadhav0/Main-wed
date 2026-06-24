export type Category = "events" | "pooja" | "sahitya"

export interface ServiceItem {
  slug: string
  category: Category
  image: string
  price: string
  duration: string
  /** localized fields keyed by language */
  title: { en: string; mr: string; hi: string }
  short: { en: string; mr: string; hi: string }
  description: { en: string; mr: string; hi: string }
  includes: { en: string[]; mr: string[]; hi: string[] }
}

export const services: ServiceItem[] = [
  {
    slug: "wedding",
    category: "events",
    image: "/images/wedding.png",
    price: "₹21,000",
    duration: "4–6 hours",
    title: { en: "Wedding Ceremony", mr: "विवाह सोहळा", hi: "विवाह समारोह" },
    short: {
      en: "Complete Vedic wedding rituals performed by experienced pandits.",
      mr: "अनुभवी पंडितांकडून संपूर्ण वैदिक विवाह विधी.",
      hi: "अनुभवी पंडितों द्वारा संपूर्ण वैदिक विवाह विधि.",
    },
    description: {
      en: "Our learned pandits conduct the entire wedding ceremony following authentic Vedic traditions — from Ganesh pooja and Kanyadaan to Saptapadi and the sacred fire rituals. Every mantra is explained so families can participate meaningfully.",
      mr: "आमचे विद्वान पंडित गणेश पूजेपासून कन्यादान, सप्तपदी आणि पवित्र अग्नि विधींपर्यंत संपूर्ण विवाह सोहळा अस्सल वैदिक परंपरेनुसार पार पाडतात. प्रत्येक मंत्राचा अर्थ समजावून सांगितला जातो.",
      hi: "हमारे विद्वान पंडित गणेश पूजा से लेकर कन्यादान, सप्तपदी और पवित्र अग्नि विधि तक संपूर्ण विवाह समारोह प्रामाणिक वैदिक परंपरा के अनुसार संपन्न करते हैं. हर मंत्र का अर्थ समझाया जाता है.",
    },
    includes: {
      en: ["Experienced pandit", "All ritual guidance", "Mantra explanations", "Samagri checklist"],
      mr: ["अनुभवी पंडित", "संपूर्ण विधी मार्गदर्शन", "मंत्र स्पष्टीकरण", "साहित्य यादी"],
      hi: ["अनुभवी पंडित", "संपूर्ण विधि मार्गदर्शन", "मंत्र व्याख्या", "सामग्री सूची"],
    },
  },
  {
    slug: "griha-pravesh",
    category: "events",
    image: "/images/griha-pravesh.png",
    price: "₹7,500",
    duration: "2–3 hours",
    title: { en: "Griha Pravesh", mr: "गृहप्रवेश", hi: "गृह प्रवेश" },
    short: {
      en: "Auspicious housewarming pooja to bless your new home.",
      mr: "तुमच्या नवीन घराला आशीर्वाद देणारी शुभ वास्तुशांती पूजा.",
      hi: "आपके नए घर को आशीर्वाद देने वाली शुभ गृह प्रवेश पूजा.",
    },
    description: {
      en: "Begin life in your new home with a Griha Pravesh ceremony that purifies the space and invites prosperity. Includes Vastu shanti, kalash sthapana and Navagraha pooja for lasting peace and positive energy.",
      mr: "वास्तुशांती, कलश स्थापना आणि नवग्रह पूजेसह तुमच्या नवीन घरात समृद्धी आणणारा गृहप्रवेश सोहळा.",
      hi: "वास्तु शांति, कलश स्थापना और नवग्रह पूजा के साथ आपके नए घर में समृद्धि लाने वाला गृह प्रवेश समारोह.",
    },
    includes: {
      en: ["Vastu shanti", "Kalash sthapana", "Navagraha pooja", "Havan"],
      mr: ["वास्तुशांती", "कलश स्थापना", "नवग्रह पूजा", "हवन"],
      hi: ["वास्तु शांति", "कलश स्थापना", "नवग्रह पूजा", "हवन"],
    },
  },
  {
    slug: "satyanarayan-pooja",
    category: "pooja",
    image: "/images/satyanarayan.png",
    price: "₹3,100",
    duration: "1.5–2 hours",
    title: { en: "Satyanarayan Pooja", mr: "सत्यनारायण पूजा", hi: "सत्यनारायण पूजा" },
    short: {
      en: "Sacred pooja invoking Lord Vishnu for prosperity and well-being.",
      mr: "समृद्धी आणि कल्याणासाठी भगवान विष्णूंची पवित्र पूजा.",
      hi: "समृद्धि और कल्याण के लिए भगवान विष्णु की पवित्र पूजा.",
    },
    description: {
      en: "The Satyanarayan Pooja is performed to express gratitude and seek blessings for success and harmony. Our pandit recites the complete katha and guides the prasad and aarti rituals.",
      mr: "यश आणि सौख्यासाठी कृतज्ञता व्यक्त करण्यासाठी सत्यनारायण पूजा केली जाते. आमचे पंडित संपूर्ण कथा वाचन व आरती करतात.",
      hi: "सफलता और सौहार्द के लिए कृतज्ञता व्यक्त करने हेतु सत्यनारायण पूजा की जाती है. हमारे पंडित संपूर्ण कथा वाचन और आरती कराते हैं.",
    },
    includes: {
      en: ["Complete katha", "Aarti & prasad", "Pandit dakshina guidance", "Samagri list"],
      mr: ["संपूर्ण कथा", "आरती व प्रसाद", "दक्षिणा मार्गदर्शन", "साहित्य यादी"],
      hi: ["संपूर्ण कथा", "आरती व प्रसाद", "दक्षिणा मार्गदर्शन", "सामग्री सूची"],
    },
  },
  {
    slug: "rudra-abhishek",
    category: "pooja",
    image: "/images/rudra-abhishek.png",
    price: "₹5,100",
    duration: "2–3 hours",
    title: { en: "Rudra Abhishek", mr: "रुद्र अभिषेक", hi: "रुद्र अभिषेक" },
    short: {
      en: "Powerful Shiva abhishek for health, peace and removal of obstacles.",
      mr: "आरोग्य, शांती आणि अडथळे दूर करण्यासाठी शक्तिशाली शिव अभिषेक.",
      hi: "स्वास्थ्य, शांति और बाधा निवारण के लिए शक्तिशाली शिव अभिषेक.",
    },
    description: {
      en: "Rudra Abhishek is the sacred bathing of the Shiva Lingam with milk, honey, water and bilva leaves while chanting Rudram. It is revered for bestowing health, prosperity and spiritual upliftment.",
      mr: "रुद्रम पठण करत दूध, मध, पाणी व बेलपत्रांनी शिवलिंगाचा पवित्र अभिषेक. आरोग्य, समृद्धी व आध्यात्मिक उन्नतीसाठी प्रसिद्ध.",
      hi: "रुद्रम पाठ करते हुए दूध, शहद, जल व बिल्वपत्र से शिवलिंग का पवित्र अभिषेक. स्वास्थ्य, समृद्धि व आध्यात्मिक उन्नति के लिए पूज्य.",
    },
    includes: {
      en: ["Rudram chanting", "Shiva abhishek", "Bilva archana", "Havan & aarti"],
      mr: ["रुद्रम पठण", "शिव अभिषेक", "बेल अर्चना", "हवन व आरती"],
      hi: ["रुद्रम पाठ", "शिव अभिषेक", "बिल्व अर्चना", "हवन व आरती"],
    },
  },
  {
    slug: "annaprashan",
    category: "pooja",
    image: "/images/annaprashan.png",
    price: "₹2,500",
    duration: "1–1.5 hours",
    title: { en: "Annaprashan", mr: "अन्नप्राशन", hi: "अन्नप्राशन" },
    short: {
      en: "Joyful ceremony marking a baby's first taste of solid food.",
      mr: "बाळाच्या पहिल्या अन्नग्रहणाचा आनंददायी संस्कार.",
      hi: "शिशु के पहले अन्न ग्रहण का आनंददायक संस्कार.",
    },
    description: {
      en: "Annaprashan is a cherished samskara celebrating an infant's first solid food. Our pandit performs the rituals with blessings for the child's health, growth and bright future.",
      mr: "अन्नप्राशन हा बाळाच्या पहिल्या अन्नग्रहणाचा प्रिय संस्कार आहे. बाळाच्या आरोग्य व उज्ज्वल भविष्यासाठी आशीर्वादासह विधी.",
      hi: "अन्नप्राशन शिशु के पहले अन्न ग्रहण का प्रिय संस्कार है. बच्चे के स्वास्थ्य व उज्ज्वल भविष्य के आशीर्वाद सहित विधि.",
    },
    includes: {
      en: ["Samskara rituals", "Blessing mantras", "Prasad preparation", "Guidance for family"],
      mr: ["संस्कार विधी", "आशीर्वाद मंत्र", "प्रसाद तयारी", "कुटुंब मार्गदर्शन"],
      hi: ["संस्कार विधि", "आशीर्वाद मंत्र", "प्रसाद तैयारी", "परिवार मार्गदर्शन"],
    },
  },
  {
    slug: "pooja-thali-set",
    category: "sahitya",
    image: "/images/sahitya-thali.png",
    price: "₹1,200",
    duration: "Ready to use",
    title: { en: "Complete Pooja Thali Set", mr: "संपूर्ण पूजा थाळी संच", hi: "संपूर्ण पूजा थाली सेट" },
    short: {
      en: "Curated pooja essentials, neatly arranged and ready for any ritual.",
      mr: "कोणत्याही विधीसाठी तयार, सुबकपणे मांडलेले पूजा साहित्य.",
      hi: "किसी भी विधि के लिए तैयार, सुव्यवस्थित पूजा सामग्री.",
    },
    description: {
      en: "A premium, ready-to-use pooja thali including kumkum, haldi, akshat, incense, cotton wicks, brass diya, camphor and fresh flowers — everything you need for an auspicious ceremony delivered to your door.",
      mr: "कुंकू, हळद, अक्षता, अगरबत्ती, वाती, पितळी दिवा, कापूर व ताजी फुले यांसह दारात पोहोचवली जाणारी प्रीमियम पूजा थाळी.",
      hi: "कुमकुम, हल्दी, अक्षत, अगरबत्ती, बाती, पीतल दीया, कपूर व ताजे फूलों सहित घर पहुँचाई जाने वाली प्रीमियम पूजा थाली.",
    },
    includes: {
      en: ["Kumkum & haldi", "Brass diya & wicks", "Incense & camphor", "Fresh flowers"],
      mr: ["कुंकू व हळद", "पितळी दिवा व वाती", "अगरबत्ती व कापूर", "ताजी फुले"],
      hi: ["कुमकुम व हल्दी", "पीतल दीया व बाती", "अगरबत्ती व कपूर", "ताजे फूल"],
    },
  },
]

export const categoryRoute: Record<Category, string> = {
  events: "events",
  pooja: "pooja",
  sahitya: "sahitya",
}

export function getService(category: Category, slug: string) {
  return services.find((s) => s.category === category && s.slug === slug)
}

export function getServicesByCategory(category: Category) {
  return services.filter((s) => s.category === category)
}
