import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut } from 'lucide-react';

export default function ImageZoom({ src, alt, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);

  const handleZoomIn = (e) => {
    e.stopPropagation();
    setScale(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setScale(prev => Math.max(prev - 0.5, 1));
  };

  return (
    <>
      <div 
        className={`relative group cursor-zoom-in ${className}`}
        onClick={() => setIsOpen(true)}
      >
        <img 
          src={src} 
          alt={alt} 
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => { setIsOpen(false); setScale(1); }}
          >
            {/* Controls */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <button 
                onClick={handleZoomOut}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <ZoomOut className="w-5 h-5 text-white" />
              </button>
              <button 
                onClick={handleZoomIn}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <ZoomIn className="w-5 h-5 text-white" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); setScale(1); }}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Image */}
            <motion.img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="max-w-full max-h-full object-contain cursor-move"
              style={{ scale }}
              initial={{ scale: 0.8 }}
              animate={{ scale }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              drag
              dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
            />

            {/* Zoom indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 px-4 py-2 rounded-full">
              <span className="text-white text-sm">{Math.round(scale * 100)}%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}