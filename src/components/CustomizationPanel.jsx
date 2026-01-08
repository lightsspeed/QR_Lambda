import React from 'react';
import { ERROR_CORRECTION_LEVELS } from '../utils/constants.js';

const CustomizationPanel = ({ settings, onSettingsChange }) => {
  const handleChange = (field, value) => {
    onSettingsChange({ ...settings, [field]: value });
  };

  return (
    <div className="border-t pt-6 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Customization</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fill Color
          </label>
          <input
            type="color"
            value={settings.fillColor}
            onChange={(e) => handleChange('fillColor', e.target.value)}
            className="w-full h-10 rounded border border-gray-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Background
          </label>
          <input
            type="color"
            value={settings.bgColor}
            onChange={(e) => handleChange('bgColor', e.target.value)}
            className="w-full h-10 rounded border border-gray-300"
          />
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Size: {settings.size}px
        </label>
        <input
          type="range"
          min="200"
          max="600"
          step="50"
          value={settings.size}
          onChange={(e) => handleChange('size', Number(e.target.value))}
          className="w-full"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Error Correction
        </label>
        <select
          value={settings.errorCorrection}
          onChange={(e) => handleChange('errorCorrection', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          {ERROR_CORRECTION_LEVELS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CustomizationPanel;