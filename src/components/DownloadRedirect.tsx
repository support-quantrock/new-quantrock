import { useEffect } from 'react';

export function DownloadRedirect() {
  useEffect(() => {
    // Detect device type
    const userAgent = navigator.userAgent || navigator.vendor;

    // Check if iOS
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      window.location.href = 'https://apps.apple.com/app/id6742403675';
    }
    // Check if Android
    else if (/android/i.test(userAgent)) {
      window.location.href = 'https://play.google.com/store/apps/details?id=com.quntriex.finance';
    }
    // Default to universal link
    else {
      window.location.href = 'https://quantrock.app.link/X6mJ3n3GGVb';
    }
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mb-4"></div>
        <p className="text-white text-lg">Redirecting to download...</p>
      </div>
    </div>
  );
}
