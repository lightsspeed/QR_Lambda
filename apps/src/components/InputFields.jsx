import React from 'react';
import { WIFI_SECURITY_TYPES } from '../utils/constants.js';

const InputFields = ({ qrType, formData, onFormChange }) => {
  const handleChange = (field, value) => {
    onFormChange({ ...formData, [field]: value });
  };

  const renderFields = () => {
    switch(qrType) {
      case 'url':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">URL</label>
            <input
              type="url"
              value={formData.qrData}
              onChange={(e) => handleChange('qrData', e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        );

      case 'text':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Text</label>
            <textarea
              value={formData.qrData}
              onChange={(e) => handleChange('qrData', e.target.value)}
              placeholder="Enter any text"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        );

      case 'email':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={formData.emailTo}
                onChange={(e) => handleChange('emailTo', e.target.value)}
                placeholder="recipient@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject (Optional)</label>
              <input
                type="text"
                value={formData.emailSubject}
                onChange={(e) => handleChange('emailSubject', e.target.value)}
                placeholder="Email subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Body (Optional)</label>
              <textarea
                value={formData.emailBody}
                onChange={(e) => handleChange('emailBody', e.target.value)}
                placeholder="Email body"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1"
              />
            </div>
          </div>
        );

      case 'phone':
        return (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              placeholder="+1234567890"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        );

      case 'wifi':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Network Name (SSID)</label>
              <input
                type="text"
                value={formData.wifiSsid}
                onChange={(e) => handleChange('wifiSsid', e.target.value)}
                placeholder="MyWiFiNetwork"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="text"
                value={formData.wifiPassword}
                onChange={(e) => handleChange('wifiPassword', e.target.value)}
                placeholder="WiFi password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Security Type</label>
              <select
                value={formData.wifiSecurity}
                onChange={(e) => handleChange('wifiSecurity', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1"
              >
                {WIFI_SECURITY_TYPES.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="mb-6">{renderFields()}</div>;
};

export default InputFields;