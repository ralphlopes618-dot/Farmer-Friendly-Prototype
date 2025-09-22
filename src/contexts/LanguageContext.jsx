import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    // Navigation
    home: 'Home',
    yieldPrediction: 'Yield Prediction',
    cropRecommendation: 'Crop Recommendation',
    diseaseDetection: 'Disease Detection',
    govtSchemes: 'Govt Schemes',
    chatbot: 'Chatbot',
    help: 'Help',
    
    // Homepage
    smartFarmingAssistant: 'Smart Farming Assistant',
    welcomeMessage: 'Your digital farming companion for better yields and smarter decisions',
    startGuidedTour: 'Start Guided Tour',
    quickAccess: 'Quick Access',
    
    // Yield Prediction
    predictYield: 'Predict Yield',
    selectRegion: 'Select Region',
    selectSoilType: 'Select Soil Type',
    selectCrop: 'Select Crop',
    calculateYield: 'Calculate Yield',
    predictedYield: 'Predicted Yield',
    
    // Crop Recommendation
    recommendCrop: 'Recommend Crop',
    selectSeason: 'Select Season',
    getSuggestions: 'Get Suggestions',
    recommendedCrops: 'Recommended Crops',
    
    // Disease Detection
    detectDisease: 'Detect Disease',
    uploadImage: 'Upload Plant Image',
    dragDrop: 'Drag & drop image here or click to select',
    analyzeImage: 'Analyze Image',
    diseaseDetected: 'Disease Detected',
    treatment: 'Treatment',
    
    // Government Schemes
    governmentSchemes: 'Government Schemes',
    knowMore: 'Know More',
    
    // Chatbot
    askQuestion: 'Ask me anything about farming...',
    send: 'Send',
    
    // Common
    back: 'Back',
    close: 'Close',
    loading: 'Loading...',
    error: 'Error occurred',
    
    // Fallback
    dataUnavailable: 'Data Unavailable',
    contactAuthority: 'Please contact your local agricultural authority for soil sample collection and analysis.',
    callNow: 'Call Now'
  },
  hi: {
    // Navigation
    home: 'होम',
    yieldPrediction: 'उत्पादन पूर्वानुमान',
    cropRecommendation: 'फसल सुझाव',
    diseaseDetection: 'रोग पहचान',
    govtSchemes: 'सरकारी योजनाएं',
    chatbot: 'चैटबॉट',
    help: 'सहायता',
    
    // Homepage
    smartFarmingAssistant: 'स्मार्ट किसान सहायक',
    welcomeMessage: 'बेहतर उत्पादन और स्मार्ट निर्णयों के लिए आपका डिजिटल किसान साथी',
    startGuidedTour: 'गाइडेड टूर शुरू करें',
    quickAccess: 'त्वरित पहुंच',
    
    // Yield Prediction
    predictYield: 'उत्पादन की भविष्यवाणी',
    selectRegion: 'क्षेत्र चुनें',
    selectSoilType: 'मिट्टी का प्रकार चुनें',
    selectCrop: 'फसल चुनें',
    calculateYield: 'उत्पादन की गणना करें',
    predictedYield: 'अनुमानित उत्पादन',
    
    // Crop Recommendation
    recommendCrop: 'फसल सुझाव',
    selectSeason: 'मौसम चुनें',
    getSuggestions: 'सुझाव प्राप्त करें',
    recommendedCrops: 'सुझाई गई फसलें',
    
    // Disease Detection
    detectDisease: 'रोग की पहचान',
    uploadImage: 'पौधे की तस्वीर अपलोड करें',
    dragDrop: 'यहाँ तस्वीर खींचें और छोड़ें या चुनने के लिए क्लिक करें',
    analyzeImage: 'तस्वीर का विश्लेषण करें',
    diseaseDetected: 'रोग की पहचान',
    treatment: 'उपचार',
    
    // Government Schemes
    governmentSchemes: 'सरकारी योजनाएं',
    knowMore: 'और जानें',
    
    // Chatbot
    askQuestion: 'कृषि के बारे में कुछ भी पूछें...',
    send: 'भेजें',
    
    // Common
    back: 'वापस',
    close: 'बंद करें',
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि हुई',
    
    // Fallback
    dataUnavailable: 'डेटा उपलब्ध नहीं',
    contactAuthority: 'मिट्टी के नमूने के संग्रह और विश्लेषण के लिए कृपया अपने स्थानीय कृषि अधिकारी से संपर्क करें।',
    callNow: 'अभी कॉल करें'
  },
  te: {
    // Navigation
    home: 'హోమ్',
    yieldPrediction: 'దిగుబడి అంచనా',
    cropRecommendation: 'పంట సిఫార్సు',
    diseaseDetection: 'వ్యాధి గుర్తింపు',
    govtSchemes: 'ప్రభుత్వ పథకాలు',
    chatbot: 'చాట్‌బాట్',
    help: 'సహాయం',
    
    // Homepage
    smartFarmingAssistant: 'స్మార్ట్ వ్యవసాయ సహాయకుడు',
    welcomeMessage: 'మెరుగైన దిగుబడి మరియు తెలివైన నిర్ణయాల కోసం మీ డిజిటల్ వ్యవసాయ సహచరుడు',
    startGuidedTour: 'గైడెడ్ టూర్ ప్రారంభించండి',
    quickAccess: 'త్వరిత యాక్సెస్',
    
    // Yield Prediction
    predictYield: 'దిగుబడి అంచనా వేయండి',
    selectRegion: 'ప్రాంతం ఎంచుకోండి',
    selectSoilType: 'మట్టి రకం ఎంచుకోండి',
    selectCrop: 'పంట ఎంచుకోండి',
    calculateYield: 'దిగుబడిని లెక్కించండి',
    predictedYield: 'అంచనా వేసిన దిగుబడి',
    
    // Crop Recommendation
    recommendCrop: 'పంట సిఫార్సు',
    selectSeason: 'సీజన్ ఎంచుకోండి',
    getSuggestions: 'సూచనలు పొందండి',
    recommendedCrops: 'సిఫార్సు చేసిన పంటలు',
    
    // Disease Detection
    detectDisease: 'వ్యాధి గుర్తించండి',
    uploadImage: 'మొక్క చిత్రాన్ని అప్‌లోడ్ చేయండి',
    dragDrop: 'ఇక్కడ చిత్రాన్ని లాగి వదలండి లేదా ఎంచుకోవడానికి క్లిక్ చేయండి',
    analyzeImage: 'చిత్రాన్ని విశ్లేషించండి',
    diseaseDetected: 'వ్యాధి కనుగొనబడింది',
    treatment: 'చికిత్స',
    
    // Government Schemes
    governmentSchemes: 'ప్రభుత్వ పథకాలు',
    knowMore: 'మరింత తెలుసుకోండి',
    
    // Chatbot
    askQuestion: 'వ్యవసాయం గురించి ఏదైనా అడగండి...',
    send: 'పంపండి',
    
    // Common
    back: 'వెనుకకు',
    close: 'మూసివేయండి',
    loading: 'లోడ్ అవుతోంది...',
    error: 'లోపం సంభవించింది',
    
    // Fallback
    dataUnavailable: 'డేటా అందుబాటులో లేదు',
    contactAuthority: 'మట్టి నమూనా సేకరణ మరియు విశ్లేషణ కోసం దయచేసి మీ స్థానిక వ్యవసాయ అధికారిని సంప్రదించండి.',
    callNow: 'ఇప్పుడే కాల్ చేయండి'
  }
};

const LanguageContext = createContext(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};