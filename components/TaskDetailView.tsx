import React from 'react';
import { TaskDetailItem, TaskBasicInfo } from '../types';
import { X, Printer, Share2, ShieldCheck, Fingerprint, MapPin, CalendarDays, ZoomIn, CheckCircle2 } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

// Define the missing MetaBlock component locally
interface MetaBlockProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

const MetaBlock: React.FC<MetaBlockProps> = ({ label, value, icon }) => (
  <div>
    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">{label}</span>
    <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
      {icon}
      <span className="truncate">{value}</span>
    </div>
  </div>
);

interface Props {
  detail: TaskDetailItem;
  basicInfo: TaskBasicInfo;
}

export const TaskDetailView: React.FC<Props> = ({ detail, basicInfo }) => {
  const isNormal = detail.isNormal !== false; 
  const { t } = useLanguage();

  return (
    <div className="relative isolate animate-fade-in-up">
      
      {/* Background Glow Effect specific to this card */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[120px] rounded-full opacity-20 pointer-events-none -z-10
        ${isNormal ? 'bg-emerald-400' : 'bg-rose-400'}`}>
      </div>

      {/* Main Glass Document */}
      <div className="glass-panel rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-900/10 border border-white/60 relative">
        
        {/* Security Pattern (Guilloche-ish overlay) */}
        <div className="absolute top-0 inset-x-0 h-48 opacity-[0.03] pointer-events-none mix-blend-multiply" 
             style={{ backgroundImage: `repeating-linear-gradient(45deg, #000 0px, #000 1px, transparent 1px, transparent 10px), repeating-linear-gradient(-45deg, #000 0px, #000 1px, transparent 1px, transparent 10px)` }}>
        </div>

        {/* Top Status Bar (The Verdict) */}
        <div className={`relative px-10 py-10 overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6
          ${isNormal 
            ? 'bg-gradient-to-b from-emerald-50/90 to-white/0' 
            : 'bg-gradient-to-b from-rose-50/90 to-white/0'
          }`}>
            
            <div className="relative z-10 flex items-center gap-6">
                {/* Animated Stamp Icon */}
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-xl border-4 border-white transform transition-transform hover:scale-105 duration-300
                    ${isNormal ? 'bg-emerald-500 text-white shadow-emerald-500/30' : 'bg-rose-500 text-white shadow-rose-500/30'}`}>
                    {isNormal ? <ShieldCheck className="w-10 h-10" /> : <X className="w-10 h-10" strokeWidth={3} />}
                </div>
                
                <div>
                    <div className="flex items-center gap-3 mb-1">
                         <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border
                            ${isNormal ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-rose-100 text-rose-700 border-rose-200'}`}>
                            {t('view.officialRecord')}
                         </span>
                         <span className="text-slate-400 text-xs font-mono">#{basicInfo.time.replace(/[- :]/g, '').slice(0, 12)}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                        {isNormal ? t('view.passed') : t('view.abnormalDetected')}
                    </h2>
                    <p className="text-slate-500 font-medium mt-2 flex items-center gap-2">
                        <CheckCircle2 className={`w-4 h-4 ${isNormal ? 'text-emerald-500' : 'text-rose-500'}`} />
                        <span>{t('view.analysisComplete')}</span>
                    </p>
                </div>
            </div>

            {/* Right: Digital Stamp / Watermark */}
            <div className="hidden md:block opacity-80 rotate-[-12deg] border-4 border-slate-900/10 p-4 rounded-lg select-none pointer-events-none grayscale">
                <div className="text-slate-900/20 text-4xl font-black uppercase tracking-widest leading-none text-center">
                    {isNormal ? t('view.verified') : t('view.flagged')}
                </div>
                <div className="text-slate-900/20 text-[10px] font-mono text-center mt-1 uppercase tracking-[0.5em]">
                    OpsTaskPro
                </div>
            </div>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-100/80">
            
            {/* Left Main Content */}
            <div className="lg:col-span-2 p-8 md:p-12 space-y-12 bg-white/40">
                
                {/* Section: Remarks */}
                <div>
                    <h3 className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-widest mb-4">
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                        {t('view.execSummary')}
                    </h3>
                    <div className="bg-white/60 rounded-xl p-8 border border-white shadow-sm relative">
                        {/* Quote decoration */}
                        <div className="absolute top-6 left-6 text-indigo-200">
                             <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9C9.00012 13.1784 11.0563 10.9575 14.1203 10.2223L14.3325 10.1654C14.7176 10.0469 14.9458 9.64293 14.8273 9.25779C14.7088 8.87264 14.3048 8.64446 13.9197 8.76298C9.58284 10.0974 6.99222 13.6705 7.00004 18.0001L7 21H14.017ZM21.017 21L21.017 18C21.017 16.8954 20.1216 16 19.017 16H16C16.0001 13.1784 18.0563 10.9575 21.1203 10.2223L21.3325 10.1654C21.7176 10.0469 21.9458 9.64293 21.8273 9.25779C21.7088 8.87264 21.3048 8.64446 20.9197 8.76298C16.5828 10.0974 13.9922 13.6705 14.0001 18.0001L14 21H21.017Z" /></svg>
                        </div>
                        {/* prose-lg ensures lines don't get uncomfortably long on wide screens */}
                        <p className="text-slate-800 leading-relaxed pl-10 text-base font-serif italic max-w-prose">
                            {detail.remark || t('view.defaultRemark')}
                        </p>
                    </div>
                </div>

                {/* Section: Evidence Grid */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-widest">
                            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                            {t('view.visualVerification')}
                        </h3>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[10px] font-mono text-slate-400">{t('view.synced')}</span>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Before */}
                        {detail.beforeImages.length > 0 && (
                            <div className="space-y-3">
                                <span className="text-[10px] font-bold text-slate-400 pl-1 block">{t('view.preCondition')}</span>
                                <div className="grid grid-cols-2 gap-3">
                                    {detail.beforeImages.map((src, i) => (
                                        <div key={i} className="group relative aspect-[4/3] bg-slate-200 rounded-lg overflow-hidden cursor-zoom-in shadow-sm hover:shadow-md transition-all">
                                            <img src={src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0" alt="evidence" />
                                            <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/10 transition-colors flex items-center justify-center">
                                                <ZoomIn className="text-white opacity-0 group-hover:opacity-100 w-6 h-6 drop-shadow-lg transform scale-50 group-hover:scale-100 transition-all duration-300" />
                                            </div>
                                            {/* Photo Corner Label */}
                                            <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur text-white text-[9px] px-1.5 py-0.5 rounded font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                                                {t('view.raw')}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                         {/* After */}
                         {detail.afterImages.length > 0 && (
                            <div className="space-y-3">
                                <span className="text-[10px] font-bold text-slate-400 pl-1 block">{t('view.postCondition')}</span>
                                <div className="grid grid-cols-2 gap-3">
                                    {detail.afterImages.map((src, i) => (
                                        <div key={i} className="group relative aspect-[4/3] bg-slate-200 rounded-lg overflow-hidden cursor-zoom-in ring-2 ring-emerald-500/0 hover:ring-emerald-500/50 transition-all shadow-sm hover:shadow-md">
                                            <img src={src} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0" alt="evidence" />
                                            <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-900/10 transition-colors flex items-center justify-center">
                                                <ZoomIn className="text-white opacity-0 group-hover:opacity-100 w-6 h-6 drop-shadow-lg transform scale-50 group-hover:scale-100 transition-all duration-300" />
                                            </div>
                                            <div className="absolute bottom-2 right-2 bg-emerald-600/80 backdrop-blur text-white text-[9px] px-1.5 py-0.5 rounded font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                                                {t('view.verified')}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Side: Meta Data Receipt */}
            <div className="lg:col-span-1 p-8 md:p-12 bg-slate-50/50 backdrop-blur-sm flex flex-col justify-between">
                <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-8 pb-2 border-b border-slate-200">
                        {t('view.metadataAudit')}
                    </h3>
                    
                    <div className="space-y-8">
                        <MetaBlock label={t('view.stepRef')} value={`${t('detail.stepPrefix')} 0${detail.stepId}: ${detail.label}`} />
                        <MetaBlock label={t('view.scenario')} value={basicInfo.scenario} icon={<MapPin className="w-3 h-3" />} />
                        <MetaBlock label={t('view.timestamp')} value={basicInfo.time} icon={<CalendarDays className="w-3 h-3" />} />
                        
                        <div className="p-4 bg-white rounded-xl border border-slate-200/60 shadow-sm mt-4">
                            <span className="text-[10px] font-bold text-slate-400 uppercase block mb-3">{t('view.personnel')}</span>
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="tech" />
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-slate-800">Alex Chen</div>
                                    <div className="text-[10px] text-slate-500 font-mono">ID: 9002-AC • {t('view.accessLevel')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-10">
                     <div className="space-y-3">
                        <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-900/10">
                            <Printer className="w-4 h-4" />
                            {t('btn.exportPDF')}
                        </button>
                        <button className="w-full py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2 shadow-sm">
                            <Share2 className="w-4 h-4" />
                            {t('btn.shareLink')}
                        </button>
                     </div>
                     <div className="mt-6 text-center">
                        <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
                            <Fingerprint className="w-3 h-3" />
                            <span className="font-mono">SHA-256: 8a7f...290x</span>
                        </div>
                     </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};