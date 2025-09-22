import React, { useState } from 'react';
import { TrendingUp, MapPin, Layers, Wheat } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Card from '../components/Card';
import Button from '../components/Button';

const YieldPredictionPage = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    region: '',
    soilType: '',
    crop: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const regions = ['North India', 'South India', 'West India', 'East India', 'Central India'];
  const soilTypes = ['Alluvial', 'Black', 'Red', 'Laterite', 'Desert', 'Mountain'];
  const crops = ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Maize', 'Pulses'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResult({
        crop: formData.crop,
        predictedYield: Math.floor(Math.random() * 20 + 10),
        confidence: Math.floor(Math.random() * 20 + 80),
        recommendations: [
          'Apply organic fertilizer 2 weeks before sowing',
          'Monitor soil moisture levels regularly',
          'Consider drip irrigation for better water management'
        ]
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <TrendingUp className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('predictYield')}
        </h1>
        <p className="text-lg text-gray-600">
          Get accurate yield predictions based on your farming conditions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
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
                <Wheat className="mr-2 h-5 w-5 text-green-600" />
                {t('selectCrop')}
              </label>
              <select
                value={formData.crop}
                onChange={(e) => setFormData({...formData, crop: e.target.value})}
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="">{t('selectCrop')}</option>
                {crops.map((crop) => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? t('loading') : t('calculateYield')}
            </Button>
          </form>
        </Card>

        {/* Results */}
        {result && (
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {t('predictedYield')}
            </h3>
            <div className="space-y-4">
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {result.predictedYield} tons/hectare
                </div>
                <div className="text-sm text-gray-600">
                  Confidence: {result.confidence}%
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Recommendations:</h4>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-green-100 text-green-600 rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-600">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default YieldPredictionPage;