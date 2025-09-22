import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  TrendingUp, 
  Sprout, 
  Shield, 
  Building2, 
  MessageCircle, 
  HelpCircle,
  Menu,
  X
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Layout = () => {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: t('home'), href: '/', icon: Home, tourId: 'navigation' },
    { name: t('yieldPrediction'), href: '/yield-prediction', icon: TrendingUp },
    { name: t('cropRecommendation'), href: '/crop-recommendation', icon: Sprout },
    { name: t('diseaseDetection'), href: '/disease-detection', icon: Shield },
    { name: t('govtSchemes'), href: '/govt-schemes', icon: Building2 },
    { name: t('chatbot'), href: '/chatbot', icon: MessageCircle, tourId: 'chatbot' },
    { name: t('help'), href: '/help', icon: HelpCircle }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <Sprout className="h-8 w-8 text-green-600" />
            <h1 className="text-lg font-bold text-gray-900">FarmAssist</h1>
          </div>
          <div className="flex items-center space-x-3">
            <div data-tour="language-switcher">
              <LanguageSwitcher />
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white">
            <nav className="px-4 py-2 space-y-1" data-tour="navigation">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-3 py-3 text-base font-medium rounded-md ${
                      location.pathname === item.href
                        ? 'bg-green-100 text-green-900'
                        : 'text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="mr-3 h-6 w-6" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      <div className="lg:flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto" data-tour="navigation">
            <div className="flex items-center flex-shrink-0 px-4">
              <Sprout className="h-10 w-10 text-green-600" />
              <h1 className="ml-3 text-xl font-bold text-gray-900">FarmAssist</h1>
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`group flex items-center px-2 py-3 text-base font-medium rounded-md ${
                        location.pathname === item.href
                          ? 'bg-green-100 text-green-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                      data-tour={item.tourId}
                    >
                      <Icon className="mr-3 h-6 w-6" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
              <div className="px-4 py-4" data-tour="language-switcher">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:pl-64 flex flex-col flex-1">
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;