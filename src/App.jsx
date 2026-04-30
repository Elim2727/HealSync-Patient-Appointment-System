import { useState, useEffect, createContext, useContext, useRef, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaPhone, FaEnvelope, FaMapMarker, FaFacebook, FaTwitter, FaInstagram, 
  FaClock, FaAmbulance, FaCheckCircle, FaArrowRight, FaPhoneAlt, 
  FaGithub, FaRobot, FaPaperPlane, FaLanguage 
} from 'react-icons/fa';

// ========== LANGUAGE CONTEXT ==========
const LanguageContext = createContext();

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  
  const translations = {
    en: {
      home: 'Home',
      features: 'Features',
      products: 'Products',
      contact: 'Contact',
      portal: 'Patient Portal',
      emergency: 'Emergency',
      heroTitle: 'Your Health, Our Priority',
      heroSubtitle: 'Experience healthcare reimagined with AI-powered diagnosis and 24/7 support',
      startJourney: 'Start Your Journey',
      callEmergency: 'Call Emergency',
      happyPatients: 'Happy Patients',
      expertDoctors: 'Expert Doctors',
      emergencyCare: 'Emergency Care',
      patientRating: 'Patient Rating',
      featuresTitle: 'Powerful Features',
      featuresSubtitle: 'Everything you need for a seamless healthcare experience',
      aiAssistant: 'AI Health Assistant',
      typeMessage: 'Type your health question here...',
      send: 'Send',
      welcomeAI: 'Hello! I am HealSync AI Assistant. How can I help you today?',
      bookingSuccess: 'Appointment confirmed!',
      emergencyNumber: '+250795071597',
      followUs: 'Follow Us',
      quickLinks: 'Quick Links',
      contactInfo: 'Contact Info',
      newsletter: 'Newsletter',
      subscribe: 'Subscribe',
      dedicated: 'Dedicated to better healthcare for everyone'
    },
    kin: {
      home: 'Ahabanza',
      features: 'Ibiranga',
      products: 'Ibicuruzwa',
      contact: 'Twandikire',
      portal: 'Irembo ry\'Umurwayi',
      emergency: 'Ibyihutirwa',
      heroTitle: 'Ubuzima Bwawe, Intego Yacu',
      heroSubtitle: 'Ubuvuzi bugezweho hamwe na AI n\'ubufasha bwa 24/7',
      startJourney: 'Tangira Urugendo',
      callEmergency: 'Hamagara Ibyihutirwa',
      happyPatients: 'Abarwayi Bishimiye',
      expertDoctors: 'Abaganga Inzobere',
      emergencyCare: 'Ubuvuzi bw\'Ibyihutirwa',
      patientRating: 'Ibipimo by\'Abarwayi',
      featuresTitle: 'Ibiranga Byiza',
      featuresSubtitle: 'Ibintu byose ukeneye kugira ngo ubone ubuvuzi bwiza',
      aiAssistant: 'Umutabazi w\'Ubuzima wa AI',
      typeMessage: 'Andika ikibazo cyawe cy\'ubuzima hano...',
      send: 'Ohereza',
      welcomeAI: 'Muraho! Ndi Umutabazi wa HealSync AI. Nigute nshobora kugufasha uyu munsi?',
      bookingSuccess: 'Appointment yemejwe!',
      emergencyNumber: '+250795071597',
      followUs: 'Dukurikire',
      quickLinks: 'Amahuza Yihuse',
      contactInfo: 'Amakuru yo Kwandikira',
      newsletter: 'Ibaruwa Yamamaza',
      subscribe: 'Iyandikishe',
      dedicated: 'Duharanira ubuvuzi bwiza kuri buri wese'
    }
  };
  
  const t = (key) => translations[language][key] || translations.en[key];
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

function useLanguage() {
  return useContext(LanguageContext);
}

// ========== AI CHATBOT COMPONENT ==========
function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { t } = useLanguage();
  const hasInitialized = useRef(false);
  
  useEffect(() => {
    if (!hasInitialized.current && messages.length === 0) {
      hasInitialized.current = true;
      setMessages([{ type: 'bot', text: t('welcomeAI') }]);
    }
  }, [messages.length, t]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const getAIResponse = useCallback((userMessage) => {
    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes('fever') || lowerMsg.includes('umuriro')) {
      return "Based on your symptoms, you might have a fever. Please rest, stay hydrated, and consult a doctor if fever persists.";
    }
    if (lowerMsg.includes('headache') || lowerMsg.includes('mutwe')) {
      return "For headaches, try resting in a dark room and staying hydrated. If severe, please consult a doctor.";
    }
    if (lowerMsg.includes('cough') || lowerMsg.includes('gikoroma')) {
      return "Persistent cough may indicate respiratory infection. Please wear a mask and consult a doctor if symptoms worsen.";
    }
    if (lowerMsg.includes('emergency') || lowerMsg.includes('ibyihutirwa')) {
      return "Emergency! Please call: +250795071597 immediately!";
    }
    if (lowerMsg.includes('appointment') || lowerMsg.includes('amasezerano')) {
      return "You can book an appointment by clicking the Patient Portal button above.";
    }
    return "I understand your concern. For specific medical advice, please consult with a healthcare professional or book an appointment through our Patient Portal.";
  }, []);
  
  const handleSend = async () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { type: 'user', text: input }]);
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      const response = getAIResponse(input);
      setMessages(prev => [...prev, { type: 'bot', text: response }]);
      setIsTyping(false);
    }, 1000);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };
  
  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 bg-gradient-to-r from-teal-500 to-blue-500 text-white p-4 rounded-full shadow-2xl z-50 flex items-center gap-2"
      >
        <FaRobot className="text-2xl animate-pulse" />
        <span className="hidden md:inline font-semibold">AI Assistant</span>
      </motion.button>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="fixed bottom-36 right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-96 h-[500px] z-50 flex flex-col border-2 border-teal-500"
        >
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FaRobot className="text-2xl" />
              <div>
                <h3 className="font-bold">{t('aiAssistant')}</h3>
                <p className="text-xs text-teal-200">Powered by HealSync AI</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white text-2xl hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center">X</button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${msg.type === 'user' ? 'bg-teal-600 text-white rounded-br-sm' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-sm'}`}>
                  {msg.type === 'bot' && <FaRobot className="inline mr-2 text-teal-500 text-sm" />}
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-3 border-t dark:border-gray-700">
            <div className="flex gap-2">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} placeholder={t('typeMessage')} className="flex-1 p-2 border rounded-xl focus:outline-none focus:border-teal-500 dark:bg-gray-700" />
              <button onClick={handleSend} className="bg-teal-600 text-white p-2 rounded-xl hover:bg-teal-700 transition"><FaPaperPlane /></button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

// ========== THEME CONTEXT ==========
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });
  
  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);
  
  return ( 
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider> 
  );
}

function useTheme() { return useContext(ThemeContext); }

// ========== EMERGENCY BUTTON ==========
function EmergencyButton() {
  const [showEmergency, setShowEmergency] = useState(false);
  const { t, language } = useLanguage();
  const emergencyNumber = '+250795071597';
  
  const emergencyContacts = [
    { name: language === 'en' ? 'Ambulance' : 'Ambulance', number: emergencyNumber, icon: '🚑', color: 'bg-red-600' },
    { name: language === 'en' ? 'Police' : 'Polisi', number: '112', icon: '👮', color: 'bg-blue-600' },
    { name: language === 'en' ? 'Fire Brigade' : 'Igikorwa cya Muriro', number: '111', icon: '🔥', color: 'bg-orange-600' }
  ];
  
  const handleCall = (number) => { 
    alert(t('emergency') + ' ' + number); 
  };
  
  return (
    <>
      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setShowEmergency(!showEmergency)} className="fixed bottom-6 right-6 bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-full shadow-2xl z-50 flex items-center gap-2">
        <FaAmbulance className="text-2xl animate-pulse" /><span className="font-bold hidden md:inline">{t('emergency')} 24/7</span>
      </motion.button>
      {showEmergency && ( 
        <motion.div initial={{ opacity: 0, scale: 0.8, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="fixed bottom-28 right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 w-72 z-50 border-2 border-red-500">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-red-600 flex items-center gap-2"><FaAmbulance /> {t('emergency')}</h3>
            <button onClick={() => setShowEmergency(false)} className="text-gray-500">X</button>
          </div>
          {emergencyContacts.map((contact, idx) => ( 
            <button key={idx} onClick={() => handleCall(contact.number)} className={`${contact.color} text-white w-full mb-2 p-3 rounded-xl flex items-center gap-3 hover:opacity-90 transition`}>
              <span className="text-2xl">{contact.icon}</span>
              <div className="flex-1 text-left">
                <p className="font-bold text-sm">{contact.name}</p>
                <p className="text-xs">{contact.number}</p>
              </div>
              <FaPhone className="text-sm" />
            </button>
          ))}
        </motion.div>
      )}
    </>
  );
}

// ========== SOCIAL MEDIA ==========
const socialLinks = { 
  github: "https://github.com/Elim2727", 
  twitter: "https://x.com/NDAYISHIMIYEIr3", 
  facebook: "https://web.facebook.com/irenee.ndayishimiye", 
  instagram: "https://www.instagram.com/___elim27_/" 
};

// ========== HEADER ==========
function Header() {
  const { isDark, setIsDark } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { name: t('home'), path: '/', icon: '🏠' },
    { name: t('features'), path: '/features', icon: '✨' },
    { name: t('products'), path: '/products', icon: '📦' },
    { name: t('contact'), path: '/contact', icon: '📞' },
    { name: t('portal'), path: '/portal', icon: '👤' },
  ];

  return (
    <div className={`${isDark ? 'bg-gray-900' : 'bg-gradient-to-r from-teal-600 to-blue-600'} shadow-xl sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 cursor-pointer group">
            <motion.div whileHover={{ rotate: 360 }} className="text-3xl">🫀</motion.div>
            <div>
              <h1 className="font-bold text-xl text-white">HealSync</h1>
              <p className="text-[10px] text-teal-200">Smart Healthcare</p>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            {navItems.map(item => ( 
              <Link key={item.path} to={item.path} className="text-white hover:text-teal-200 transition text-sm font-medium flex items-center gap-1">
                <span>{item.icon}</span> {item.name}
              </Link>
            ))}
            <div className="relative group">
              <button className="text-white hover:text-teal-200 flex items-center gap-1"><FaLanguage /> {language === 'en' ? 'EN' : 'KIN'}</button>
              <div className="absolute top-full right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg hidden group-hover:block p-2">
                <button onClick={() => setLanguage('en')} className="block w-full px-4 py-2 text-sm hover:bg-teal-100 rounded">English</button>
                <button onClick={() => setLanguage('kin')} className="block w-full px-4 py-2 text-sm hover:bg-teal-100 rounded">Kinyarwanda</button>
              </div>
            </div>
            <button onClick={() => setIsDark(!isDark)} className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30">
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
          
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white text-2xl">{isMenuOpen ? 'X' : '☰'}</button>
          <div className="hidden md:block text-right">
            <p className="text-xs font-semibold text-white">Irene Ndayishimiye</p>
            <p className="text-[10px] text-teal-200">Reg: 25RP00182</p>
          </div>
        </div>
        
        {isMenuOpen && ( 
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden mt-4 pt-4 border-t border-white/20">
            {navItems.map(item => ( 
              <Link key={item.path} to={item.path} onClick={() => setIsMenuOpen(false)} className="block text-white py-2 hover:bg-white/10 rounded-lg px-3">
                {item.icon} {item.name}
              </Link>
            ))}
            <div className="px-3 py-2">
              <button onClick={() => setLanguage(language === 'en' ? 'kin' : 'en')} className="text-white hover:bg-white/10 rounded-lg px-3 py-2 w-full text-left">
                <FaLanguage className="inline mr-2" /> {language === 'en' ? 'Kinyarwanda' : 'English'}
              </button>
            </div>
            <button onClick={() => { setIsDark(!isDark); setIsMenuOpen(false); }} className="block w-full text-left text-white py-2 hover:bg-white/10 rounded-lg px-3">
              {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ========== FOOTER ==========
function Footer() {
  const { t } = useLanguage();
  const emergencyNumber = '+250795071597';
  
  return (
    <div className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4"><span className="text-2xl">🫀</span><h3 className="font-bold text-lg">HealSync</h3></div>
            <p className="text-sm text-gray-400">{t('dedicated')}</p>
            <div className="flex gap-3 mt-4">
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-700"><FaFacebook /></a>
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="bg-sky-500 w-10 h-10 rounded-full flex items-center justify-center hover:bg-sky-600"><FaTwitter /></a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="bg-pink-600 w-10 h-10 rounded-full flex items-center justify-center hover:bg-pink-700"><FaInstagram /></a>
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-800"><FaGithub /></a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-teal-400">{t('home')}</Link></li>
              <li><Link to="/features" className="hover:text-teal-400">{t('features')}</Link></li>
              <li><Link to="/products" className="hover:text-teal-400">{t('products')}</Link></li>
              <li><Link to="/contact" className="hover:text-teal-400">{t('contact')}</Link></li>
              <li><Link to="/portal" className="hover:text-teal-400">{t('portal')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">{t('contactInfo')}</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2"><FaPhone className="text-teal-400" /> {emergencyNumber}</li>
              <li className="flex items-center gap-2"><FaEnvelope className="text-teal-400" /> info@healsync.rw</li>
              <li className="flex items-center gap-2"><FaMapMarker className="text-teal-400" /> Kigali, Rwanda</li>
              <li className="flex items-center gap-2"><FaClock className="text-teal-400" /> 24/7 Available</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">{t('newsletter')}</h3>
            <p className="text-sm text-gray-400 mb-3">Subscribe for health tips</p>
            <div className="flex">
              <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 rounded-l-lg text-gray-900 text-sm" />
              <button className="bg-teal-600 px-4 py-2 rounded-r-lg hover:bg-teal-700">{t('subscribe')}</button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>© 2026 Irene Ndayishimiye (Reg: 25RP00182) | HealSync Healthcare Platform</p>
          <p className="text-xs mt-2">❤️ {t('dedicated')} | Emergency: {emergencyNumber}</p>
        </div>
      </div>
    </div>
  );
}

// ========== HOME PAGE ==========
function HomePage() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  
  const stats = [
    { number: '50,000+', label: t('happyPatients'), icon: '👨' },
    { number: '200+', label: t('expertDoctors'), icon: '👨‍⚕️' },
    { number: '24/7', label: t('emergencyCare'), icon: '🚑' },
    { number: '4.9', label: t('patientRating'), icon: '⭐' }
  ];

  return (
    <div className={`${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-teal-50 via-white to-blue-50'} min-h-screen`}>
      <Header />
      <div className="relative h-[500px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-blue-900/80"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('heroTitle')}</h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">{t('heroSubtitle')}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/portal" className="bg-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-700 transition inline-flex items-center gap-2">
              {t('startJourney')} <FaArrowRight />
            </Link>
            <a href="tel:+250795071597" className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition inline-flex items-center gap-2">
              <FaPhoneAlt /> {t('callEmergency')}
            </a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => ( 
            <div key={index} className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 text-center shadow-lg`}>
              <div className="text-5xl mb-3">{stat.icon}</div>
              <div className="text-2xl font-bold text-teal-600">{stat.number}</div>
              <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 mx-4 rounded-3xl p-8 md:p-12 text-center text-white mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to transform your healthcare experience?</h2>
        <p className="mb-6 text-teal-100">Join thousands of happy patients who trust HealSync</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/portal" className="inline-block bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            {t('startJourney')}
          </Link>
          <a href="tel:+250795071597" className="inline-block bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition">
            <FaPhoneAlt className="inline mr-2" /> {t('callEmergency')}
          </a>
        </div>
      </div>
      
      <Footer />
      <EmergencyButton />
      <AIChatbot />
    </div>
  );
}

// ========== FEATURES PAGE ==========
function FeaturesPage() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  
  const features = [
    { icon: '🤒', title: 'Symptom Checker', desc: 'AI-powered symptom analysis', color: 'bg-red-100' },
    { icon: '👨‍⚕️', title: 'Doctor Match', desc: 'Find the right specialist', color: 'bg-blue-100' },
    { icon: '📅', title: 'Easy Booking', desc: 'Schedule in seconds', color: 'bg-green-100' },
    { icon: '🔔', title: 'Smart Reminders', desc: 'Never miss appointments', color: 'bg-yellow-100' },
    { icon: '🤖', title: 'AI Assistant', desc: '24/7 health support', color: 'bg-purple-100' },
    { icon: '🌍', title: 'Multi-language', desc: 'English and Kinyarwanda', color: 'bg-teal-100' }
  ];
  
  return ( 
    <div className={`${isDark ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen`}>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>{t('featuresTitle')}</h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>{t('featuresSubtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => ( 
            <div key={index} className={`${feature.color} rounded-2xl p-6 text-center shadow-lg`}>
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <EmergencyButton />
      <AIChatbot />
    </div>
  );
}

// ========== PRODUCTS PAGE ==========
function ProductsPage() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  
  const products = [
    { name: 'Basic Plan', price: 'Free', featuresList: ['Symptom Checker', 'Doctor Discovery', 'Email Support'] },
    { name: 'Pro Plan', price: '$9.99/mo', featuresList: ['All Basic', 'Video Consultations', '24/7 Support', 'AI Assistant'] },
    { name: 'Family Plan', price: '$29.99/mo', featuresList: ['All Pro', '5 Family Members', 'Emergency Alert', 'Home Visits'] }
  ];
  
  return ( 
    <div className={`${isDark ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen`}>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>{t('products')}</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => ( 
            <div key={index} className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 text-center shadow-xl`}>
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <div className="text-3xl font-bold text-teal-600 mb-4">{product.price}</div>
              <ul className="space-y-2 mb-6">
                {product.featuresList.map((feature, i) => ( 
                  <li key={i} className="text-sm flex items-center gap-2"><FaCheckCircle className="text-green-500" /> {feature}</li>
                ))}
              </ul>
              <button className="bg-teal-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-teal-700 w-full">Choose Plan</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <EmergencyButton />
      <AIChatbot />
    </div>
  );
}

// ========== CONTACT PAGE ==========
function ContactPage() {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const emergencyNumber = '+250795071597';
  
  const handleSubmit = (e) => { 
    e.preventDefault(); 
    setSubmitted(true); 
    setTimeout(() => setSubmitted(false), 3000); 
  };
  
  return ( 
    <div className={`${isDark ? 'bg-gray-900' : 'bg-gray-50'} min-h-screen`}>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>{t('contact')}</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:border-teal-500" required />
              <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:border-teal-500" required />
              <textarea placeholder="Your Message" rows="5" className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:border-teal-500" required />
              <button type="submit" className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 w-full">{t('send')}</button>
            </form>
            {submitted && <div className="mt-4 bg-green-100 text-green-700 p-3 rounded-lg text-center">Message sent successfully!</div>}
          </div>
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-lg`}>
            <h2 className="text-2xl font-bold mb-6">{t('contactInfo')}</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center"><FaPhone className="text-teal-600" /></div>
                <div><p className="font-semibold">{t('emergency')}</p><p className="text-sm text-gray-600">{emergencyNumber}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center"><FaEnvelope className="text-teal-600" /></div>
                <div><p className="font-semibold">Email</p><p className="text-sm text-gray-600">info@healsync.rw</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center"><FaMapMarker className="text-teal-600" /></div>
                <div><p className="font-semibold">Address</p><p className="text-sm text-gray-600">Kigali, Rwanda</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <EmergencyButton />
      <AIChatbot />
    </div>
  );
}

// ========== PATIENT PORTAL ==========
function PatientPortal() {
  const [step, setStep] = useState(1);
  const [symptoms, setSymptoms] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointment, setAppointment] = useState({});
  const [checkedIn, setCheckedIn] = useState(false);
  const [queuePosition, setQueuePosition] = useState(4);
  const { isDark } = useTheme();
  const { t, language } = useLanguage();
  
  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: language === 'en' ? 'General Physician' : 'Umuganga Mukuru', rating: 4.9, avatar: '👩‍⚕️' },
    { id: 2, name: 'Dr. Michael Chen', specialty: language === 'en' ? 'Cardiologist' : 'Umuganga w\'Umutima', rating: 4.9, avatar: '👨‍⚕️' },
    { id: 3, name: 'Dr. Emily Davis', specialty: language === 'en' ? 'Pediatrician' : 'Umuganga w\'Abana', rating: 4.8, avatar: '👩‍⚕️' }
  ];
  
  useEffect(() => { 
    if (queuePosition === 1 && step === 6) { 
      const timer = setTimeout(() => setStep(7), 2000); 
      return () => clearTimeout(timer); 
    } 
  }, [queuePosition, step]);
  
  useEffect(() => { 
    if (step === 6) { 
      const timer = setInterval(() => setQueuePosition(prev => prev > 1 ? prev - 1 : prev), 3000); 
      return () => clearInterval(timer); 
    } 
  }, [step]);
  
  const renderStepContent = () => {
    const stepNumber = step;
    
    if (stepNumber === 1) {
      const symptomText = language === 'en' ? 'How are you feeling?' : 'Uramutse ute?';
      const placeholderText = language === 'en' ? 'Describe your symptoms...' : 'Andika ibyo uramutse...';
      return ( 
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🤒</div>
          <h2 className="text-2xl font-bold mb-4">{symptomText}</h2>
          <textarea placeholder={placeholderText} value={symptoms} onChange={(e) => setSymptoms(e.target.value)} className={`w-full p-3 rounded-xl border-2 ${isDark ? 'bg-gray-700 border-gray-600' : 'border-gray-200'} mb-6`} rows="3" />
          <button onClick={() => setStep(2)} disabled={!symptoms} className="bg-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-700 disabled:opacity-50 transition">Next →</button>
        </div>
      );
    }
    
    if (stepNumber === 2) {
      const chooseText = language === 'en' ? 'Choose Your Doctor' : 'Hitamo Umuganga';
      return ( 
        <div className="text-center">
          <div className="text-6xl mb-4">👨‍⚕️</div>
          <h2 className="text-2xl font-bold mb-4">{chooseText}</h2>
          <div className="space-y-3 mb-6">
            {doctors.map(doctor => ( 
              <div key={doctor.id} onClick={() => setSelectedDoctor(doctor)} className={`p-4 rounded-xl cursor-pointer transition ${selectedDoctor?.id === doctor.id ? 'ring-2 ring-teal-500 bg-teal-50' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{doctor.avatar}</div>
                  <div>
                    <h3 className="font-bold">{doctor.name}</h3>
                    <p className="text-sm text-gray-600">{doctor.specialty}</p>
                    <span className="text-yellow-500">★ {doctor.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setStep(3)} disabled={!selectedDoctor} className="bg-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-700 disabled:opacity-50 transition">Next →</button>
        </div>
      );
    }
    
    if (stepNumber === 3) {
      const today = new Date().toISOString().split('T')[0]; 
      const bookText = language === 'en' ? 'Book Appointment' : 'Teganya Amasezerano';
      return ( 
        <div className="text-center">
          <div className="text-6xl mb-4">📅</div>
          <h2 className="text-2xl font-bold mb-4">{bookText}</h2>
          <input type="date" min={today} onChange={(e) => setAppointment({...appointment, date: e.target.value})} className={`w-full p-3 rounded-xl border-2 ${isDark ? 'bg-gray-700 border-gray-600' : 'border-gray-200'} mb-4`} />
          <div className="grid grid-cols-3 gap-2 mb-6">
            {['09:00', '10:00', '11:00', '14:00', '15:00'].map(t => ( 
              <button key={t} onClick={() => setAppointment({...appointment, time: t})} className={`p-2 rounded-lg border-2 transition ${appointment.time === t ? 'bg-teal-600 text-white' : 'border-gray-200'}`}>{t}</button>
            ))}
          </div>
          <button onClick={() => setStep(4)} disabled={!appointment.date || !appointment.time} className="bg-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-700 disabled:opacity-50 transition">Confirm →</button>
        </div>
      );
    }
    
    if (stepNumber === 4) {
      return ( 
        <div className="text-center">
          <div className="text-7xl mb-4 animate-bounce">✅</div>
          <h2 className="text-2xl font-bold text-green-600 mb-4">{t('bookingSuccess')}</h2>
          <div className="bg-teal-50 rounded-xl p-4 mb-6 text-left">
            <p>📅 {appointment.date}</p>
            <p>⏰ {appointment.time}</p>
            <p>👨‍⚕️ {selectedDoctor?.name}</p>
          </div>
          <button onClick={() => setStep(5)} className="bg-teal-600 text-white px-8 py-3 rounded-full font-semibold">Check In →</button>
        </div>
      );
    }
    
    if (stepNumber === 5) {
      const checkText = language === 'en' ? 'Check-in' : 'Kwinjira';
      return ( 
        <div className="text-center">
          <div className="text-6xl mb-4">🏥</div>
          <h2 className="text-2xl font-bold mb-4">{checkText}</h2>
          {!checkedIn ? ( 
            <button onClick={() => setCheckedIn(true)} className="bg-teal-600 text-white px-8 py-4 rounded-full font-semibold">📍 Check In Now</button>
          ) : ( 
            <div>
              <div className="bg-green-100 rounded-xl p-4 mb-6">
                <div className="text-4xl">✅</div>
                <p className="font-bold text-green-800">Checked In!</p>
                <p className="text-sm">Queue: <span className="font-bold text-xl">A24</span></p>
              </div>
              <button onClick={() => setStep(6)} className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold">View Queue →</button>
            </div>
          )}
        </div>
      );
    }
    
    if (stepNumber === 6) {
      const queueText = language === 'en' ? 'Live Queue' : 'Urutonde';
      const peopleText = language === 'en' ? 'people ahead' : 'abakubanjirije';
      return ( 
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">⏳</div>
          <h2 className="text-2xl font-bold mb-4">{queueText}</h2>
          <div className="text-8xl font-bold text-teal-600 animate-bounce mb-4">{queuePosition}</div>
          <p className="mb-6">{peopleText}</p>
          <div className="bg-yellow-50 rounded-xl p-4 mb-6">
            <p className="text-2xl font-bold text-yellow-600">~{queuePosition * 5} min</p>
          </div>
          {queuePosition === 1 && <button onClick={() => setStep(7)} className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold animate-pulse">🎯 Your Turn!</button>}
        </div>
      );
    }
    
    if (stepNumber === 7) {
      const summaryText = language === 'en' ? 'Summary' : 'Urupapuro';
      return ( 
        <div className="text-center">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-bold mb-4">{summaryText}</h2>
          <div className="space-y-3 text-left mb-6">
            <div className="flex justify-between py-2 border-b"><span>Diagnosis:</span><span className="font-bold">Acute Pharyngitis</span></div>
            <div className="flex justify-between py-2 border-b"><span>Prescription:</span><span className="font-bold">Amoxicillin</span></div>
          </div>
          <button onClick={() => setStep(8)} className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold">Set Reminders →</button>
        </div>
      );
    }
    
    if (stepNumber === 8) {
      return ( 
        <div className="text-center">
          <div className="text-7xl mb-4 animate-float">💊</div>
          <h2 className="text-2xl font-bold text-green-600 mb-4">Reminders Set!</h2>
          <div className="bg-yellow-50 rounded-xl p-4 mb-6">
            <p>💊 Take medication at 8PM daily</p>
            <p>🔄 Follow-up in 14 days</p>
          </div>
          <button onClick={() => { setStep(1); setSymptoms(''); setSelectedDoctor(null); setAppointment({}); setCheckedIn(false); setQueuePosition(4); }} className="bg-teal-600 text-white px-6 py-3 rounded-full font-semibold">🔄 Start Over</button>
        </div>
      );
    }
    
    return null;
  };
  
  return ( 
    <div className={`${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-teal-50 via-white to-blue-50'} min-h-screen`}>
      <Header />
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="flex justify-between mb-8">
          {[1,2,3,4,5,6,7,8].map(s => ( 
            <div key={s} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${s <= step ? 'bg-teal-600 text-white' : 'bg-gray-300'}`}>{s}</div>
          ))}
        </div>
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl p-6`}>{renderStepContent()}</div>
        <p className="text-center text-xs text-gray-500 mt-6">Irene Ndayishimiye (Reg: 25RP00182) - HealSync</p>
      </div>
      <Footer />
      <EmergencyButton />
      <AIChatbot />
    </div>
  );
}

// ========== MAIN APP ==========
function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/portal" element={<PatientPortal />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
