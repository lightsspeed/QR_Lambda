import { Link, Type, Mail, Phone, Wifi } from 'lucide-react';

export const QR_TYPES = [
  { type: 'url', icon: Link, label: 'URL' },
  { type: 'text', icon: Type, label: 'Text' },
  { type: 'email', icon: Mail, label: 'Email' },
  { type: 'phone', icon: Phone, label: 'Phone' },
  { type: 'wifi', icon: Wifi, label: 'WiFi' }
];

export const ERROR_CORRECTION_LEVELS = [
  { value: 'L', label: 'Low (7%)' },
  { value: 'M', label: 'Medium (15%)' },
  { value: 'Q', label: 'Quartile (25%)' },
  { value: 'H', label: 'High (30%)' }
];

export const WIFI_SECURITY_TYPES = [
  { value: 'WPA', label: 'WPA/WPA2' },
  { value: 'WEP', label: 'WEP' },
  { value: 'nopass', label: 'No Password' }
];

export const DEFAULT_SETTINGS = {
  fillColor: '#000000',
  bgColor: '#FFFFFF',
  size: 300,
  errorCorrection: 'M'
};