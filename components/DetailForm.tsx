import React, { useState } from 'react';
import { TaskDetailItem } from '../types';
import { ImageUploader } from './ImageUploader';
import { Check, X, MoreHorizontal, AlertCircle } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  detail: TaskDetailItem;
}

export const DetailForm: React.FC<Props> = ({ detail }) => {
  const [status, setStatus] = useState<boolean | null>(detail.isNormal);
  const { t } = useLanguage();

  return (
    <div className="relative isolate">
      {/* Main Content Card */}
      <div className="glass-panel rounded-[2.5rem] p-10 md:p-12 shadow-2xl shadow-indigo-900/5 overflow-hidden relative">
        
        {/* Subtle top highlight */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-70" />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12">
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-slate-900/20">
                        {t('detail.stepPrefix')} 0{detail.stepId}
                    </span>
                    <span className="text-slate-400 text-sm font-medium">/ 05</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                    {detail.label}
                </h1>
            </div>
            <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all bg-white/50 backdrop-blur-sm">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>
        </div>

        <div className="space-y-12">
            {/* 1. Status Selector - The "Hero" Interaction */}
            <div className="space-y-4">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
                    {t('detail.inspectionOutcome')}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Normal Button */}
                    <button 
                        onClick={() => setStatus(true)}
                        className={`group relative h-28 rounded-2xl border transition-all duration-500 overflow-hidden outline-none flex items-center px-8
                            ${status === true 
                                ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 border-transparent shadow-[0_10px_40px_-10px_rgba(16,185,129,0.5)] translate-y-[-2px]' 
                                : 'bg-white border-slate-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-900/5'}`}
                    >
                        {status === true && (
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                        )}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-500 z-10
                            ${status === true ? 'bg-white/20 text-white backdrop-blur-md' : 'bg-emerald-50 text-emerald-500 group-hover:scale-110'}`}>
                            <Check strokeWidth={3} className="w-6 h-6" />
                        </div>
                        <div className="ml-6 z-10 text-left">
                            <span className={`block text-lg font-bold ${status === true ? 'text-white' : 'text-slate-800'}`}>{t('detail.normal')}</span>
                            <span className={`text-xs ${status === true ? 'text-emerald-100' : 'text-slate-400'}`}>{t('detail.normalDesc')}</span>
                        </div>
                    </button>

                    {/* Abnormal Button */}
                    <button 
                        onClick={() => setStatus(false)}
                        className={`group relative h-28 rounded-2xl border transition-all duration-500 overflow-hidden outline-none flex items-center px-8
                            ${status === false 
                                ? 'bg-gradient-to-br from-rose-500 to-rose-600 border-transparent shadow-[0_10px_40px_-10px_rgba(244,63,94,0.5)] translate-y-[-2px]' 
                                : 'bg-white border-slate-100 hover:border-rose-200 hover:shadow-lg hover:shadow-rose-900/5'}`}
                    >
                         {status === false && (
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                        )}
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-500 z-10
                            ${status === false ? 'bg-white/20 text-white backdrop-blur-md' : 'bg-rose-50 text-rose-500 group-hover:scale-110'}`}>
                            <X strokeWidth={3} className="w-6 h-6" />
                        </div>
                        <div className="ml-6 z-10 text-left">
                            <span className={`block text-lg font-bold ${status === false ? 'text-white' : 'text-slate-800'}`}>{t('detail.abnormal')}</span>
                            <span className={`text-xs ${status === false ? 'text-rose-100' : 'text-slate-400'}`}>{t('detail.abnormalDesc')}</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* 2. Remarks - Minimalist Editorial Style */}
            <div className="space-y-4">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
                    {t('detail.fieldNotes')}
                </label>
                <div className="relative group">
                    <textarea 
                        className="w-full min-h-[160px] p-6 bg-slate-50/50 hover:bg-white border border-slate-200 hover:border-slate-300 rounded-2xl focus:outline-none focus:ring-0 focus:border-indigo-500 focus:bg-white transition-all text-slate-700 text-base leading-relaxed resize-none shadow-inner"
                        placeholder={t('detail.fieldNotesPlaceholder')}
                        defaultValue={detail.remark}
                    ></textarea>
                    {/* Corner accent */}
                    <div className="absolute bottom-4 right-4 text-[10px] font-mono text-slate-300 bg-slate-100 px-2 py-1 rounded">
                        {t('detail.markdown')}
                    </div>
                </div>
            </div>

            {/* 3. Evidence - Gallery Style */}
            <div className="pt-8 border-t border-slate-100/80">
                <div className="flex items-end justify-between mb-8">
                     <div>
                        <h3 className="text-xl font-bold text-slate-900">{t('detail.visualEvidence')}</h3>
                        <p className="text-slate-400 text-sm mt-1">{t('detail.uploadDesc')}</p>
                     </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    <ImageUploader images={detail.beforeImages} label={t('detail.preMaintenance')} />
                    <ImageUploader images={detail.afterImages} label={t('detail.postMaintenance')} />
                </div>
            </div>
        </div>

        {/* Footer / Actions - Integrated into the card for a cohesive feel */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
            <button className="text-slate-400 hover:text-slate-600 font-medium text-sm transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                {t('btn.saveDraft')}
            </button>
            <div className="flex gap-4">
                <button className="px-8 py-3.5 bg-slate-900 hover:bg-black text-white rounded-xl font-bold text-sm shadow-xl shadow-slate-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 group">
                    {t('btn.nextStep')}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};