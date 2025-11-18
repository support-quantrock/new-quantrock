import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface GalleryItem {
  type: 'image' | 'video';
  src: string;
  alt?: string;
}

interface GalleryProps {
  items: GalleryItem[];
}

export function Gallery({ items }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState<GalleryItem | null>(null);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const openModal = (item: GalleryItem) => {
    setModalItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalItem(null);
  };

  return (
    <>
      <div className="relative max-w-4xl mx-auto">
        <div className="relative aspect-[9/16] md:aspect-video overflow-hidden rounded-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              {items[currentIndex].type === 'image' ? (
                <img
                  src={items[currentIndex].src}
                  alt={items[currentIndex].alt || `Gallery item ${currentIndex + 1}`}
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={() => openModal(items[currentIndex])}
                  loading="lazy"
                />
              ) : (
                <video
                  src={items[currentIndex].src}
                  className="w-full h-full object-contain cursor-pointer"
                  muted
                  loop
                  playsInline
                  onClick={() => openModal(items[currentIndex])}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
          aria-label="Previous item"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
          aria-label="Next item"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="flex justify-center gap-2 mt-6">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-gradient-to-r from-[#A855F7] to-[#3B82F6] w-8' : 'bg-white/30'
              }`}
              aria-label={`Go to item ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && modalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeModal}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-purple-400 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-8 h-8" />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-6xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {modalItem.type === 'video' ? (
                <video
                  src={modalItem.src}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                  loop
                />
              ) : (
                <img
                  src={modalItem.src}
                  alt={modalItem.alt}
                  className="w-full h-full object-contain"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
