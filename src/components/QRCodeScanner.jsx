import React, { useRef, useEffect } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

const QRCodeScanner = ({ onScan, onError }) => {
  const videoRef = useRef(null);
  const isUnmountedRef = useRef(false);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    const videoElement = videoRef.current;

    const startScanning = async () => {
      try {
        console.log('Requesting video stream...');
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoElement) {
          videoElement.srcObject = stream;
          await videoElement.play();
          console.log('Video stream started.');
        }
        if (!isUnmountedRef.current) {
          codeReader.decodeFromVideoDevice(undefined, videoElement, (result, error) => {
            if (result) {
              console.log('QR code detected:', result.getText());
              onScan(result.getText());
            }
            if (error && !(error instanceof NotFoundException)) {
              console.error('Decode error:', error);
              onError(error);
            }
          });
        }
      } catch (error) {
        console.error('Error accessing video stream:', error);
        onError(error);
      }
    };

    startScanning();

    return () => {
      isUnmountedRef.current = true;
      codeReader.reset();
      if (videoElement && videoElement.srcObject) {
        const tracks = videoElement.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [onScan, onError]);

  return (
    <div>
      <video ref={videoRef} style={{ width: '100%' }} />
    </div>
  );
};

export default QRCodeScanner;
