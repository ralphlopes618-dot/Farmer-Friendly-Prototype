import React, { useState, useCallback } from 'react';
import { Shield, Upload, Camera, AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Card from '../components/Card';
import Button from '../components/Button';

const DiseaseDetectionPage = () => {
  const { t } = useLanguage();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResult({
        disease: 'Leaf Blight',
        confidence: 92,
        severity: 'Moderate',
        description: 'Leaf blight is a common fungal disease that affects crop leaves, causing brown spots and eventual leaf death.',
        treatment: [
          'Remove and destroy affected leaves',
          'Apply copper-based fungicide spray',
          'Improve air circulation around plants',
          'Avoid overhead watering'
        ],
        prevention: [
          'Use disease-resistant varieties',
          'Maintain proper plant spacing',
          'Apply preventive fungicide treatments'
        ]
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
          <Shield className="h-8 w-8 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {t('detectDisease')}
        </h1>
        <p className="text-lg text-gray-600">
          Upload a photo of your plant to detect diseases
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('uploadImage')}
          </h3>
          
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-green-500 bg-green-50' 
                : uploadedImage
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {uploadedImage ? (
              <div className="space-y-4">
                <img
                  src={uploadedImage}
                  alt="Uploaded plant"
                  className="max-w-full max-h-64 mx-auto rounded-lg"
                />
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={handleAnalyze}
                    disabled={loading}
                    size="lg"
                  >
                    {loading ? t('loading') : t('analyzeImage')}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setUploadedImage(null);
                      setResult(null);
                    }}
                  >
                    Upload New
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Camera className="h-12 w-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-gray-600 text-lg mb-2">
                    {t('dragDrop')}
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button variant="outline" size="lg" className="cursor-pointer">
                      <Upload className="mr-2 h-5 w-5" />
                      Select Image
                    </Button>
                  </label>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Results */}
        {result && (
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <AlertCircle className="mr-2 h-6 w-6 text-red-600" />
              {t('diseaseDetected')}
            </h3>
            
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-red-900">{result.disease}</h4>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
                    {result.confidence}% confident
                  </span>
                </div>
                <p className="text-red-700 text-sm mb-2">Severity: {result.severity}</p>
                <p className="text-red-700 text-sm">{result.description}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                  {t('treatment')}
                </h4>
                <ul className="space-y-2">
                  {result.treatment.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-green-100 text-green-600 rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-600">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Prevention Tips</h4>
                <ul className="space-y-2">
                  {result.prevention.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-blue-100 text-blue-600 rounded-full w-2 h-2 mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-600">{tip}</span>
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

export default DiseaseDetectionPage;