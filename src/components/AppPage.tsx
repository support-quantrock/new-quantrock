import { QRCodeSVG } from 'qrcode.react';

export function AppPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">

        {/* Phone Mockup Card */}
        <div className="relative">
          <div className="bg-white rounded-3xl p-6 shadow-2xl">
            <div className="relative w-[280px] h-[560px] bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-inner">
              {/* Phone notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-10"></div>

              {/* Phone screen content */}
              <div className="w-full h-full bg-black flex items-center justify-center p-8">
                <img
                  src="/media/logo_png-2.png"
                  alt="Quantrock"
                  className="w-32 h-32 object-contain"
                />
              </div>
            </div>

            {/* App title below phone */}
            <div className="text-center mt-6">
              <div className="text-2xl font-bold text-gray-900">Quantrock</div>
            </div>
          </div>
        </div>

        {/* QR Code and Download Section */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Scan to download<br />the app
          </h1>

          {/* QR Code Container */}
          <div className="bg-white p-6 rounded-2xl shadow-2xl mb-8 inline-block">
            <QRCodeSVG
              value="https://quantrock.app.link/X6mJ3n3GGVb"
              size={240}
              level="H"
              includeMargin={true}
              imageSettings={{
                src: "/media/logo_png-2.png",
                height: 55,
                width: 55,
                excavate: true,
              }}
            />
          </div>

          {/* OR Divider */}
          <div className="flex items-center gap-4 w-full max-w-xs mb-8">
            <div className="flex-1 h-px bg-gray-600"></div>
            <span className="text-gray-400 text-lg font-semibold">OR</span>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          {/* App Store Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://apps.apple.com/app/id6742403675"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-105 transition-transform"
            >
              <img
                src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1733011200"
                alt="Download on the App Store"
                className="h-14 w-auto"
              />
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=com.quntriex.finance"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-105 transition-transform"
            >
              <img
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Get it on Google Play"
                className="h-14 w-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
