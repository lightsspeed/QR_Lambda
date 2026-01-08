import React, { useState } from 'react';
import './App.css';
import QRTypeSelector from './components/QRTypeSelector';
import InputFields from './components/InputFields';
import CustomizationPanel from './components/CustomizationPanel';
import QRPreview from './components/QRPreview';
import { generateQRCode, formatQRData } from './services/qrService';
import { DEFAULT_SETTINGS } from './utils/constants';

function App() {
  const [qrType, setQrType] = useState('url');
  const [qrImage, setQrImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form data state
  const [formData, setFormData] = useState({
    qrData: '',
    emailTo: '',
    emailSubject: '',
    emailBody: '',
    phoneNumber: '',
    wifiSsid: '',
    wifiPassword: '',
    wifiSecurity: 'WPA'
  });
  
  // Customization settings
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const handleGenerateQR = async () => {
    setLoading(true);
    setError('');
    setQrImage('');
    
    try {
      const data = formatQRData(qrType, formData);
      const result = await generateQRCode(data, settings);
      setQrImage(result);
    } catch (err) {
      setError(err.message || 'Error generating QR code. Make sure your API endpoint is configured.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          QR Code Generator
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create QR Code</h2>
            
            <QRTypeSelector 
              selectedType={qrType} 
              onTypeChange={setQrType} 
            />
            
            <InputFields 
              qrType={qrType} 
              formData={formData} 
              onFormChange={setFormData} 
            />
            
            <CustomizationPanel 
              settings={settings} 
              onSettingsChange={setSettings} 
            />
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}
            
            <button
              onClick={handleGenerateQR}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : 'Generate QR Code'}
            </button>
          </div>
          
          {/* Preview Section */}
          <QRPreview qrImage={qrImage} size={settings.size} />
        </div>
        
        {/* Instructions */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Setup Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Deploy the Lambda function and API Gateway (see deployment guide)</li>
            <li>Update <code className="bg-gray-100 px-2 py-1 rounded">src/services/qrService.js</code> with your API Gateway URL</li>
            <li>Start generating QR codes!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;