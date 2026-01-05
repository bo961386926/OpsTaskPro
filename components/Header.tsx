import React from 'react';
import { Search, Bell, FileText, FileCheck, Languages } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  isViewMode?: boolean;
  onToggleMode?: () => void;
}

export const Header: React.FC<Props> = ({ isViewMode = false, onToggleMode }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="fixed top-6 left-0 right-0 z-40 px-4 sm:px-6 lg:px-8 pointer-events-none">
      {/* Increased max-width for 1080p+ screens */}
      <div className="max-w-[1800px] mx-auto pointer-events-auto">
        <div className="glass-panel rounded-full px-6 h-16 flex items-center justify-between shadow-sm hover:shadow-lg transition-shadow duration-500">
            {/* Logo Section */}
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <span className="font-bold text-lg tracking-tight text-slate-900 hidden sm:block">OpsTaskPro</span>
                </div>

                <nav className="hidden md:flex items-center space-x-1 text-sm font-medium text-slate-500">
                    <span className="hover:text-black transition-colors px-3 py-1 cursor-pointer">{t('nav.operations')}</span>
                    <span className="text-slate-300">/</span>
                    <span className="text-black bg-white shadow-sm border border-slate-100 px-3 py-1 rounded-full cursor-pointer flex items-center gap-2">
                        {isViewMode ? t('nav.taskReport') : t('nav.taskEntry')}
                    </span>
                </nav>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-2">
                
                {/* Language Switcher */}
                <button 
                  onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors mr-2 group"
                >
                    <div className="w-8 h-5 rounded-full bg-slate-200 relative border border-slate-300 shadow-inner">
                        <div className={`absolute top-0.5 bottom-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 flex items-center justify-center text-[8px] font-bold
                            ${language === 'zh' ? 'left-0.5 text-indigo-600' : 'left-3.5 text-slate-600'}`}>
                            {language === 'zh' ? '中' : 'En'}
                        </div>
                    </div>
                </button>

                {/* Mode Toggle (Demo Feature) */}
                {onToggleMode && (
                  <button 
                    onClick={onToggleMode}
                    className="flex items-center gap-2 px-4 py-1.5 mr-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border
                    hover:scale-105 active:scale-95
                    bg-slate-900 text-white border-transparent shadow-lg shadow-slate-900/20"
                  >
                    {isViewMode ? (
                        <>
                            <FileText className="w-3 h-3" />
                            <span className="hidden sm:inline">{t('btn.switchToEdit')}</span>
                        </>
                    ) : (
                        <>
                            <FileCheck className="w-3 h-3" />
                            <span className="hidden sm:inline">{t('btn.previewReport')}</span>
                        </>
                    )}
                  </button>
                )}

                <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-slate-100/50 rounded-full border border-slate-200/50 mr-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                    <span className="text-xs font-semibold text-slate-600">{t('status.online')}</span>
                </div>
                
                <button className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
                </button>
                <div className="w-10 h-10 rounded-full p-0.5 border border-slate-200 ml-2 cursor-pointer hover:border-indigo-400 transition-colors">
                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Profile" className="rounded-full w-full h-full object-cover" />
                </div>
            </div>
        </div>
      </div>
    </header>
  );
};