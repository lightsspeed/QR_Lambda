import React from 'react';
import { Download } from 'lucide-react';
import { downloadQRCode } from '../services/qrService';

const QRPreview = ({ qrImage, size }) => {
  const handleDownload = () => {
    downloadQRCode(qrImage);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Preview</h2>
      
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        {qrImage ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <img 
                src={qrImage} 
                alt="Generated QR Code"
                className="border-4 border-gray-200 rounded-lg shadow-md"
                style={{ width: size, height: size }}
              />
            </div>
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              <Download size={20} />
              Download QR Code
            </button>
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <div className="w-48 h-48 border-4 border-dashed border-gray-300 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-6xl">QR</span>
            </div>
            <p className="text-lg">Your QR code will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRPreview;