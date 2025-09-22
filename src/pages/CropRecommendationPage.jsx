import React, { useState } from 'react';
import { Sprout, MapPin, Layers, Sun } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Card from '../components/Card';
import Button from '../components/Button';

const CropRecommendationPage = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    region: '',
    soilType: '',
    season: ''
  });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const regions = ['North India', 'South India', 'West India', 'East India', 'Central India'];
  const soilTypes = ['Alluvial', 'Black', 'Red', 'Laterite', 'Desert', 'Mountain'];
  const seasons = ['Kharif (Monsoon)', 'Rabi (Winter)', 'Zaid (Summer)'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockRecommendations = [
        {
          name: 'Rice',
          suitability: 95,
          expectedYield: '4-6 tons/hectare',
          tips: 'Best for water-rich areas. Requires good drainage.',
          icon: '🌾'
        },
        {
          name: 'Wheat',
          suitability: 85,
          expectedYield: '3-4 tons/hectare',
          tips: 'Suitable for cooler climate. Less water requirement.',
          icon: '🌾'
        },
        {
          name: 'Maize',
          suitability: 80,
          expectedYield: '5-7 tons/hectare',
          tips: 'Good for moderate rainfall areas. High nutrition value.',
          icon: '🌽'
        }
      ];
      setRecommendations(mockRecommendations);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <Sprout className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('recommendCrop')}
        </h1>
        <p className="text-lg text-gray-600">
          Get personalized crop recommendations for your land
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="flex items-center text-lg font-medium text-gray-900 mb-3">
                  <MapPin className="mr-2 h-5 w-5 text-green-600" />
                  {t('selectRegion')}
                </label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({...formData, region: e.target.value})}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">{t('selectRegion')}</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center text-lg font-medium text-gray-900 mb-3">
                  <Layers className="mr-2 h-5 w-5 text-green-600" />
                  {t('selectSoilType')}
                </label>
                <select
                  value={formData.soilType}
                  onChange={(e) => setFormData({...formData, soilType: e.target.value})}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">{t('selectSoilType')}</option>
                  {soilTypes.map((soil) => (
                    <option key={soil} value={soil}>{soil}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center text-lg font-medium text-gray-900 mb-3">
                  <Sun className="mr-2 h-5 w-5 text-green-600" />
                  {t('selectSeason')}
                </label>
                <select
                  value={formData.season}
                  onChange={(e) => setFormData({...formData, season: e.target.value})}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">{t('selectSeason')}</option>
                  {seasons.map((season) => (
                    <option key={season} value={season}>{season}</option>
                  ))}
                </select>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? t('loading') : t('getSuggestions')}
              </Button>
            </form>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-2">
          {recommendations.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {t('recommendedCrops')}
              </h3>
              <div className="space-y-4">
                {recommendations.map((crop, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="text-4xl">{crop.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-xl font-semibold text-gray-900">{crop.name}</h4>
                            <div className="flex items-center">
                              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                {crop.suitability}% suitable
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-2">Expected Yield: {crop.expectedYield}</p>
                          <p className="text-gray-600 text-sm">{crop.tips}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropRecommendationPage;