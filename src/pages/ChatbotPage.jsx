import React, { useState } from 'react';
import { MessageCircle, Send, Mic, MicOff } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Card from '../components/Card';
import Button from '../components/Button';

const ChatbotPage = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hello! I'm your farming assistant. ${t('askQuestion')}`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (text) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(messageText),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setLoading(false);
    }, 1000);
  };

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('rice') || lowerMessage.includes('चावल')) {
      return "Rice cultivation requires well-drained soil and consistent water supply. The best time to plant is during monsoon season. Would you like specific advice for your region?";
    }
    if (lowerMessage.includes('wheat') || lowerMessage.includes('गेहूं')) {
      return "Wheat grows best in cool, dry weather. Plant in November-December for optimal yield. Ensure proper soil preparation and seed treatment.";
    }
    if (lowerMessage.includes('fertilizer') || lowerMessage.includes('खाद')) {
      return "For organic farming, use compost and vermicompost. For chemical fertilizers, get your soil tested first. NPK ratio depends on crop and soil type.";
    }
    if (lowerMessage.includes('disease') || lowerMessage.includes('बीमारी')) {
      return "Common crop diseases include blight, rust, and viral infections. Use our Disease Detection feature to identify specific issues. Prevention is better than cure!";
    }
    if (lowerMessage.includes('weather') || lowerMessage.includes('मौसम')) {
      return "Weather plays a crucial role in farming. Monitor local forecasts regularly. I can help you plan activities based on weather conditions.";
    }
    
    return "I'm here to help with all your farming questions! Ask me about crops, diseases, fertilizers, weather, or government schemes. You can also use voice input for easier communication.";
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US'; // You could make this dynamic based on selected language
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleSendMessage(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = () => {
        setIsListening(false);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <MessageCircle className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('chatbot')}
        </h1>
        <p className="text-lg text-gray-600">
          Get instant answers to your farming questions
        </p>
      </div>

      <Card className="h-96 flex flex-col">
        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={t('askQuestion')}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
            />
            <Button
              onClick={handleVoiceInput}
              variant={isListening ? 'primary' : 'outline'}
              size="lg"
              className="px-4"
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            <Button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || loading}
              size="lg"
              className="px-6"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Quick Questions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Quick Questions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            'How to increase crop yield?',
            'Best fertilizer for rice?',
            'Organic pest control methods',
            'Water management tips',
            'Soil testing importance',
            'Government loan schemes'
          ].map((question, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => handleSendMessage(question)}
              className="text-left justify-start h-auto py-3 px-4"
            >
              {question}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;