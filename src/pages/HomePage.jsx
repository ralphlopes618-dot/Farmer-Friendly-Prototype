import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Sprout, Shield, Building2, PlayCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Card from '../components/Card';
import Button from '../components/Button';
import GuidedTour from '../components/GuidedTour';

const HomePage = () => {
  const { t } = useLanguage();
  const [showTour, setShowTour] = useState(false);

  const quickLinks = [
    {
      title: t('yieldPrediction'),
      description: 'Predict crop yields based on soil and weather data',
      href: '/yield-prediction',
      icon: TrendingUp,
      color: 'bg-blue-500',
      tourId: 'yield-prediction'
    },
    {
      title: t('cropRecommendation'),
      description: 'Get crop suggestions for your soil and climate',
      href: '/crop-recommendation',
      icon: Sprout,
      color: 'bg-green-500',
      tourId: 'crop-recommendation'
    },
    {
      title: t('diseaseDetection'),
      description: 'Identify plant diseases from photos',
      href: '/disease-detection',
      icon: Shield,
      color: 'bg-red-500',
      tourId: 'disease-detection'
    },
    {
      title: t('govtSchemes'),
      description: 'Explore government agricultural schemes',
      href: '/govt-schemes',
      icon: Building2,
      color: 'bg-purple-500',
      tourId: 'govt-schemes'
    }
  ];

  return (
    <>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="bg-green-100 p-4 rounded-full">
              <Sprout className="h-16 w-16 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            {t('smartFarmingAssistant')}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t('welcomeMessage')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="text-lg px-8"
              onClick={() => setShowTour(true)}
            >
              <PlayCircle className="mr-2 h-5 w-5" />
              {t('startGuidedTour')}
            </Button>
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            {t('quickAccess')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.href} to={link.href}>
                  <Card 
                    className="p-6 h-full hover:scale-105 transition-transform duration-200" 
                    data-tour={link.tourId}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`${link.color} p-3 rounded-lg flex-shrink-0`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {link.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {link.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Weather Widget - Farmer-specific content */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Today's Weather
              </h3>
              <p className="text-gray-600">Perfect conditions for irrigation</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">28°C</div>
              <div className="text-sm text-gray-500">Partly Cloudy</div>
            </div>
          </div>
        </Card>

        {/* Farmer Tips */}
        <Card className="p-6 bg-green-50 border-green-200">
          <h3 className="text-lg font-semibold text-green-900 mb-3">
            💡 Today's Farming Tip
          </h3>
          <p className="text-green-800">
            Check soil moisture before irrigation. Over-watering can lead to root rot and reduce crop yield. 
            Use the finger test - insert your finger 2 inches into soil, if it's dry, it's time to water.
          </p>
        </Card>
      </div>

      <GuidedTour isOpen={showTour} onClose={() => setShowTour(false)} />
    </>
  );
};

export default HomePage;