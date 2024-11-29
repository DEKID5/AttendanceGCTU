import React, { useState, useEffect } from 'react';
import { BrowserQRCodeReader } from '@zxing/library';

function QRCodeScanner({ onScan }) {
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [devices, setDevices] = useState([]);
  const [scanner, setScanner] = useState(null);

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();
    setScanner(codeReader);

    codeReader.getVideoInputDevices()
      .then(videoInputDevices => {
        setDevices(videoInputDevices);
        if (videoInputDevices.length > 0) {
          setSelectedDeviceId(videoInputDevices[0].deviceId);
        }
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedDeviceId && scanner) {
      const previewElem = document.getElementById('video-preview');
      scanner.decodeFromVideoDevice(selectedDeviceId, previewElem, (result, err) => {
        if (result) {
          onScan(result.text);
        }
        if (err) {
          console.error(err);
        }
      });

      return () => {
        scanner.reset();
      };
    }
  }, [selectedDeviceId, scanner, onScan]);

  return (
    <div>
      <h3>Scan QR Code</h3>
      {devices.length > 1 && (
        <select onChange={(e) => setSelectedDeviceId(e.target.value)} value={selectedDeviceId}>
          {devices.map((device, idx) => (
            <option key={idx} value={device.deviceId}>{device.label || `Device ${idx + 1}`}</option>
          ))}
        </select>
      )}
      <video id="video-preview" width="100%" height="240" />
    </div>
  );
}

export default QRCodeScanner;
