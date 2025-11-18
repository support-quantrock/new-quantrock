import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MarqueeItem {
  name: string;
  placeholder: string;
  aum?: string;
  stocks?: string;
}

interface MarqueeCategory {
  name: string;
  items: MarqueeItem[];
}

interface MarqueeProps {
  categories: MarqueeCategory[];
}

export function Marquee({ categories }: MarqueeProps) {
  const [activeTab, setActiveTab] = useState(0);
  const items = categories[activeTab]?.items || [];
  const [scrollPosition, setScrollPosition] = useState(0);

  const cardWidth = 130;
  const gap = 10;
  const maxScroll = Math.max(0, items.length * (cardWidth + gap) - (cardWidth * 7));

  const scrollLeft = () => {
    setScrollPosition(prev => Math.max(0, prev - (cardWidth + gap)));
  };

  const scrollRight = () => {
    setScrollPosition(prev => Math.min(maxScroll, prev + (cardWidth + gap)));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition(prev => {
        const next = prev + (cardWidth + gap);
        if (next > maxScroll) {
          return 0;
        }
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [maxScroll, cardWidth, gap]);

  return (
    <div className="relative">
      <div className="flex justify-center gap-1.5 mb-12 px-2 flex-wrap">
        {categories.map((category, index) => (
          <button
            key={category.name}
            onClick={() => {
              setActiveTab(index);
              setScrollPosition(0);
            }}
            className={`px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
              activeTab === index
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="relative">
        <button
          onClick={scrollLeft}
          disabled={scrollPosition === 0}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gray-800/80 hover:bg-gray-700/80 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all backdrop-blur-sm border border-gray-700"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={scrollRight}
          disabled={scrollPosition >= maxScroll}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gray-800/80 hover:bg-gray-700/80 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-all backdrop-blur-sm border border-gray-700"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        <div className="overflow-hidden px-4">
          <motion.div
            key={activeTab}
            className="flex gap-4"
            initial={{ x: 0 }}
            animate={{ x: -scrollPosition }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {items.map((item, index) => (
              <motion.div
                key={`${item.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative flex-shrink-0 w-[130px] h-[180px] rounded-lg overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/90 z-10" />

                <img
                  src={item.placeholder}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute bottom-0 left-0 right-0 p-2 z-20">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-3 h-0.5 bg-white" />
                  </div>
                  <h3 className="text-white text-xs font-bold mb-0.5 leading-tight">
                    {item.name}
                  </h3>
                  {item.aum && (
                    <p className="text-blue-400 text-[10px] font-semibold mb-0.5">
                      {item.aum}
                    </p>
                  )}
                  {item.stocks && (
                    <p className="text-gray-300 text-[9px]">
                      {item.stocks}
                    </p>
                  )}
                </div>

                <div className="absolute inset-0 z-20 bg-gradient-to-t from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-transparent transition-all duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(items.length / 7) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setScrollPosition(index * (cardWidth + gap) * 7)}
              className={`w-2 h-2 rounded-full transition-all ${
                Math.floor(scrollPosition / ((cardWidth + gap) * 7)) === index
                  ? 'bg-white w-8'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
