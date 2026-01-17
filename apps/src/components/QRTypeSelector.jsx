import React from 'react';
import { QR_TYPES } from '../utils/constants.js';

const QRTypeSelector = ({ selectedType, onTypeChange }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        QR Code Type
      </label>
      <div className="grid grid-cols-2 gap-3">
        {QR_TYPES.map(({ type, icon: Icon, label }) => (
          <button
            key={type}
            onClick={() => onTypeChange(type)}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
              selectedType === type
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Icon size={18} />
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QRTypeSelector;