import React from 'react';
import { UploadCloud, ZoomIn, MoreHorizontal } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  images: string[];
  label: string;
}

export const ImageUploader: React.FC<Props> = ({ images, label }) => {
  const { t } = useLanguage();
  return (
    <div className="group/section">
      <div className="flex items-center justify-between mb-4">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</label>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {images.map((src, idx) => (
          <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-zoom-in group">
            <img src={src} alt="Evidence" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter group-hover:contrast-110" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
               <span className="text-white text-[10px] font-medium bg-black/30 backdrop-blur-md px-2 py-1 rounded">IMG_00{idx + 1}.JPG</span>
               <button className="p-1.5 bg-white/20 hover:bg-white text-white hover:text-black rounded-lg backdrop-blur-md transition-colors">
                  <ZoomIn className="w-3.5 h-3.5" />
               </button>
            </div>
          </div>
        ))}
        
        {/* Upload Button */}
        <div className="aspect-[4/3] rounded-xl border border-dashed border-slate-300 hover:border-indigo-500 bg-slate-50/50 hover:bg-indigo-50/30 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer group/upload">
            <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-3 group-hover/upload:scale-110 group-hover/upload:shadow-md transition-transform">
                <UploadCloud className="w-5 h-5 text-slate-400 group-hover/upload:text-indigo-500 transition-colors" />
            </div>
            <span className="text-xs font-semibold text-slate-500 group-hover/upload:text-indigo-600">{t('img.upload')}</span>
        </div>
      </div>
    </div>
  );
};