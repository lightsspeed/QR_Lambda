/**
 * QR Code Service
 * Handles QR code data formatting and API interactions
 */

//Want to use an environment variable for the API endpoint
 const API_ENDPOINT = process.env.REACT_APP_API_URL;

/**
 * Format data based on QR code type
 */
export const formatQRData = (type, formData) => {
  switch(type) {
    case 'url':
      return formData.qrData;
    
    case 'text':
      return formData.qrData;
    
    case 'email':
      return `mailto:${formData.emailTo}?subject=${encodeURIComponent(formData.emailSubject)}&body=${encodeURIComponent(formData.emailBody)}`;
    
    case 'phone':
      return `tel:${formData.phoneNumber}`;
    
    case 'wifi':
      return `WIFI:T:${formData.wifiSecurity};S:${formData.wifiSsid};P:${formData.wifiPassword};;`;
    
    default:
      return formData.qrData;
  }
};

/**
 * Generate QR code by calling the Lambda API
 */
export const generateQRCode = async (data, settings) => {
  if (!data) {
    throw new Error('Please enter data to generate QR code');
  }

  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: data,
      fill_color: settings.fillColor,
      back_color: settings.bgColor,
      box_size: Math.floor(settings.size / 30),
      error_correction: settings.errorCorrection
    })
  });

  if (!response.ok) {
    throw new Error('Failed to generate QR code');
  }

  const result = await response.json();

  // FIX STARTS HERE: Ensure the string has the data URI prefix
  const qrCodeData = result.qr_code;
  if (!qrCodeData.startsWith('data:image/png;base64,')) {
    result.qr_code = `data:image/png;base64,${qrCodeData}`;
  }
  return result.qr_code;
};

/**
 * Download QR code as PNG
 */
export const downloadQRCode = (qrImage, filename = 'qrcode.png') => {
  const link = document.createElement('a');
  link.href = qrImage;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};