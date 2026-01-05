import React from 'react';
import { TaskBasicInfo } from '../types';
import { LayoutTemplate, MapPin, CalendarDays, Clock } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  info: TaskBasicInfo;
}

export const BasicInfoCard: React.FC<Props> = ({ info }) => {
  const { t } = useLanguage();
  return (
    <div className="mb-10 animate-fade-in-down">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 px-1">
        
        {/* Context Breadcrumbs/Title - Replaces old card */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <div className="flex items-center gap-2 text-slate-500">
                <LayoutTemplate className="w-4 h-4" />
                <span className="font-medium text-slate-900">{info.type}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-300"></div>
            <div className="flex items-center gap-2 text-slate-500">
                <MapPin className="w-4 h-4" />
                <span className="font-medium text-slate-900">{info.scenario}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-300"></div>
            <div className="flex items-center gap-2 text-slate-500">
                <CalendarDays className="w-4 h-4" />
                <span className="font-mono text-slate-900">{info.time}</span>
            </div>
        </div>

        {/* Quick Actions / Floating Remark */}
        <div className="hidden lg:block">
             <div className="relative group">
                <input 
                    type="text" 
                    placeholder={t('info.placeholder')}
                    className="bg-white/40 hover:bg-white/80 border border-slate-200/60 rounded-full py-1.5 px-4 text-xs w-64 focus:w-80 transition-all outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
             </div>
        </div>
      </div>
    </div>
  );
};