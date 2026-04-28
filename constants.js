const fertilizerProducts = [
  {
    id: "fp-1",
    name: "IFFCO यूरिया",
    price: 266,
    unit: "45 किग्रा बैग",
    image: "https://source.unsplash.com/400x300/?fertilizer,granules",
    description: "तेजी से पौधों की वृद्धि के लिए नाइट्रोजन उर्वरक।"
  },
  {
    id: "fp-2",
    name: "नैनो यूरिया लिक्विड (IFFCO)",
    price: 240,
    unit: "500 मिली बोतल",
    image: "https://source.unsplash.com/400x300/?liquid,fertilizer",
    description: "कम नुकसान के साथ प्रभावी नाइट्रोजन आपूर्ति।"
  },
  {
    id: "fp-3",
    name: "डीएपी उर्वरक",
    price: 1350,
    unit: "50 किग्रा बैग",
    image: "https://source.unsplash.com/400x300/?fertilizer,bag",
    description: "जड़ों के विकास के लिए फॉस्फोरस युक्त उर्वरक।"
  },
  {
    id: "fp-4",
    name: "एनपीके 10:26:26",
    price: 1450,
    unit: "50 किग्रा बैग",
    image: "https://source.unsplash.com/400x300/?npk,fertilizer",
    description: "फूल आने की अवस्था के लिए संतुलित पोषक मिश्रण।"
  },
  {
    id: "fp-5",
    name: "एनपीके 12:32:16",
    price: 1520,
    unit: "50 किग्रा बैग",
    image: "https://source.unsplash.com/400x300/?agriculture,fertilizer",
    description: "अधिकांश फसलों के लिए लोकप्रिय शुरुआती उर्वरक।"
  },
  {
    id: "fp-6",
    name: "एनपीके 20:20:0:13 (सल्फर युक्त)",
    price: 1180,
    unit: "50 किग्रा बैग",
    image: "https://source.unsplash.com/400x300/?soil,nutrients",
    description: "नाइट्रोजन और सल्फर से भरपूर तेज वृद्धि के लिए।"
  },
  {
    id: "fp-7",
    name: "म्यूरिएट ऑफ पोटाश (MOP)",
    price: 980,
    unit: "50 किग्रा बैग",
    image: "https://source.unsplash.com/400x300/?potash",
    description: "पोटैशियम से फसल की गुणवत्ता बढ़ाता है।"
  },
  {
    id: "fp-8",
    name: "सल्फेट ऑफ पोटाश (SOP)",
    price: 1320,
    unit: "25 किग्रा बैग",
    image: "https://source.unsplash.com/400x300/?fertilizer,potassium",
    description: "क्लोराइड-फ्री पोटाश, संवेदनशील फसलों के लिए बेहतर।"
  },
  {
    id: "fp-9",
    name: "सिंगल सुपर फॉस्फेट (SSP)",
    price: 420,
    unit: "50 किग्रा बैग",
    image: "https://source.unsplash.com/400x300/?phosphate,fertilizer",
    description: "सस्ता फॉस्फोरस और सल्फर स्रोत।"
  },
  {
    id: "fp-10",
    name: "जिंक सल्फेट 21%",
    price: 460,
    unit: "10 किग्रा बैग",
    image: "https://source.unsplash.com/400x300/?micronutrients,soil",
    description: "जिंक की कमी को दूर करने में सहायक।"
  },
  {
    id: "fp-11",
    name: "फेरस सल्फेट (आयरन)",
    price: 360,
    unit: "10 किग्रा बैग",
    image: "https://source.unsplash.com/400x300/?iron,fertilizer",
    description: "पत्तों का हरापन और क्लोरोफिल बढ़ाता है।"
  },
  {
    id: "fp-12",
    name: "बोरॉन 20%",
    price: 310,
    unit: "1 किग्रा पैक",
    image: "https://source.unsplash.com/400x300/?boron,plant",
    description: "फूल और फल बनने में मदद करता है।"
  },
  {
    id: "fp-13",
    name: "कैल्शियम नाइट्रेट",
    price: 720,
    unit: "25 किग्रा बैग",
    image: "https://source.unsplash.com/400x300/?calcium,plants",
    description: "फलों की मजबूती और नाइट्रोजन आपूर्ति।"
  },
  {
    id: "fp-14",
    name: "मैग्नीशियम सल्फेट",
    price: 410,
    unit: "25 किग्रा बैग",
    image: "https://source.unsplash.com/400x300/?magnesium,plant",
    description: "प्रकाश संश्लेषण को बेहतर बनाता है।"
  },
  {
    id: "fp-15",
    name: "ह्यूमिक एसिड ग्रैन्यूल्स",
    price: 520,
    unit: "25 किग्रा बैग",
    image: "https://source.unsplash.com/400x300/?soil,granules",
    description: "मिट्टी की गुणवत्ता और जड़ों को मजबूत करता है।"
  },
  {
    id: "fp-16",
    name: "सीवीड एक्सट्रैक्ट",
    price: 650,
    unit: "1 लीटर बोतल",
    image: "https://source.unsplash.com/400x300/?seaweed,extract",
    description: "प्राकृतिक ग्रोथ प्रमोटर और स्ट्रेस रिलीवर।"
  },
  {
    id: "fp-17",
    name: "अमीनो एसिड फर्टिलाइज़र",
    price: 560,
    unit: "1 लीटर बोतल",
    image: "https://source.unsplash.com/400x300/?plant,nutrition",
    description: "पोषक तत्वों के अवशोषण को बढ़ाता है।"
  },
  {
    id: "fp-18",
    name: "नीम खली पाउडर",
    price: 390,
    unit: "25 किग्रा बैग",
    image: "https://source.unsplash.com/400x300/?neem,powder",
    description: "जैविक खाद और कीट नियंत्रण में सहायक।"
  }
];

const pesticideProducts = [
  {
    id: "fp-19",
    name: "इमिडाक्लोप्रिड 17.8 SL",
    price: 780,
    unit: "500 मिली बोतल",
    image: "https://source.unsplash.com/400x300/?pesticide,spray",
    description: "रस चूसने वाले कीटों पर प्रभावी नियंत्रण।"
  },
  {
    id: "fp-20",
    name: "क्लोरपायरीफॉस 20 EC",
    price: 640,
    unit: "1 लीटर बोतल",
    image: "https://source.unsplash.com/400x300/?insecticide,agriculture",
    description: "विस्तृत स्पेक्ट्रम कीटनाशक।"
  },
  {
    id: "fp-21",
    name: "लैम्ब्डा साइहैलोथ्रिन 5 EC",
    price: 460,
    unit: "250 मिली बोतल",
    image: "https://source.unsplash.com/400x300/?crop,spraying",
    description: "तेजी से कीटों को खत्म करने वाला स्प्रे।"
  },
  {
    id: "fp-22",
    name: "मैनकोजेब 75 WP",
    price: 440,
    unit: "1 किग्रा पैक",
    image: "https://source.unsplash.com/400x300/?fungicide,plants",
    description: "फंगल रोगों से बचाव के लिए।"
  },
  {
    id: "fp-23",
    name: "कार्बेन्डाजिम 50 WP",
    price: 520,
    unit: "1 किग्रा पैक",
    image: "https://source.unsplash.com/400x300/?plant,disease",
    description: "पौधों के फंगल रोगों का इलाज।"
  },
  {
    id: "fp-24",
    name: "ग्लाइफोसेट 41 SL",
    price: 680,
    unit: "1 लीटर बोतल",
    image: "https://source.unsplash.com/400x300/?weed,control",
    description: "गैर-चयनात्मक खरपतवार नाशक।"
  },
  {
    id: "fp-25",
    name: "एट्राज़ीन 50 WP",
    price: 360,
    unit: "1 किग्रा पैक",
    image: "https://source.unsplash.com/400x300/?herbicide,farming",
    description: "खरपतवार नियंत्रण के लिए प्री-इमर्जेंस दवा।"
  }
];

const seedProducts = [
  {
    id: "sd-1",
    name: "गेहूं बीज HD-2967",
    price: 210,
    unit: "10 किग्रा बैग",
    image: "https://images.unsplash.com/photo-1621400343361-0fe9ff2f9b63?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdoZWF0fGVufDB8fDB8fHww",
    description: "उच्च उपज देने वाली गेहूं किस्म।"
  },
  {
    id: "sd-2",
    name: "धान बीज 1121 (बासमती)",
    price: 290,
    unit: "10 किग्रा बैग",
    image: "https://images.unsplash.com/photo-1723475158232-819e29803f4d?q=80&w=900&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "प्रीमियम क्वालिटी बासमती धान।"
  },
  {
    id: "sd-3",
    name: "मक्का हाइब्रिड 900M",
    price: 420,
    unit: "4 किग्रा पैक",
    image: "https://images.unsplash.com/photo-1554402100-8d1d9f3dff80?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "उच्च उत्पादन और मजबूत भुट्टा।"
  },
  {
    id: "sd-4",
    name: "बाजरा हाइब्रिड BH-946",
    price: 320,
    unit: "2 किग्रा पैक",
    image: "https://images.unsplash.com/photo-1602018342965-6dd19657e145?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "सूखा सहन करने वाली किस्म।"
  },
  {
    id: "sd-7",
    name: "अरहर UPAS-120",
    price: 300,
    unit: "5 किग्रा बैग",
    image: "https://plus.unsplash.com/premium_photo-1726729279950-224b83ae7a75?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bXVuZy1iZWFuc3xlbnwwfHwwfHx8MA%3D%3D",
    description: "जल्दी पकने वाली अरहर किस्म।"
  },
  {
    id: "sd-5",
    name: "सरसों पूसा बोल्ड",
    price: 380,
    unit: "2 किग्रा पैक",
    image: "https://images.unsplash.com/photo-1662314689481-e108cdc6f2c0?q=80&w=772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "तेल उत्पादन के लिए लोकप्रिय किस्म।"
  },
  {
    id: "sd-6",
    name: "चना JG-11",
    price: 260,
    unit: "10 किग्रा बैग",
    image: "https://plus.unsplash.com/premium_photo-1675237624857-7d995e29897d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpY2twZWFzfGVufDB8fDB8fHww",
    description: "बाजार में अधिक मांग वाली किस्म।"
  },
  {
    id: "sd-8",
    name: "मूंग PDM-139",
    price: 340,
    unit: "5 किग्रा बैग",
    image: "https://images.unsplash.com/photo-1758701925687-1449ab265c2e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVuZy1iZWFuc3xlbnwwfHwwfHx8MA%3D%3D",
    description: "कम अवधि वाली मूंग फसल।"
  },
  {
    id: "sd-9",
    name: "उड़द T-9",
    price: 330,
    unit: "5 किग्रा बैग",
    image: "https://plus.unsplash.com/premium_photo-1726729279950-224b83ae7a75?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bXVuZy1iZWFuc3xlbnwwfHwwfHx8MA%3D%3D",
    description: "स्थिर उत्पादन वाली उड़द किस्म।"
  },
  {
    id: "sd-11",
    name: "मूंगफली GG-20",
    price: 410,
    unit: "8 किग्रा बैग",
    image: "https://plus.unsplash.com/premium_photo-1726072356924-e29e8999df09?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVhbnV0c3xlbnwwfHwwfHx8MA%3D%3D",
    description: "उच्च गुणवत्ता वाली मूंगफली।"
  }
];