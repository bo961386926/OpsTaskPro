import React from 'react';
import { Step } from '../types';
import { Check } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  steps: Step[];
  currentStepId: number;
  onStepClick: (id: number) => void;
}

export const StepSidebar: React.FC<Props> = ({ steps, currentStepId, onStepClick }) => {
  const { t } = useLanguage();

  return (
    /* Increased width on 2xl screens (w-96 = 384px) */
    <div className="hidden lg:block w-72 2xl:w-96 shrink-0 pt-6 transition-all duration-700">
      <div className="sticky top-32">
        <h3 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-[0.2em] mb-10 pl-4">
            {t('sidebar.title')}
        </h3>
        
        <div className="relative">
          {/* Continuous Line */}
          <div className="absolute left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-slate-200 via-slate-300 to-transparent" />

          <div className="space-y-3">
            {steps.map((step) => {
              const isActive = step.id === currentStepId;
              const isCompleted = step.status === 'completed';
              
              return (
                <div 
                  key={step.id} 
                  onClick={() => onStepClick(step.id)}
                  className={`group relative flex items-center p-3 rounded-2xl cursor-pointer transition-all duration-500 border border-transparent
                    ${isActive ? 'bg-white/60 backdrop-blur-md shadow-glass border-white/50 translate-x-2' : 'hover:bg-white/30 hover:translate-x-1'}
                  `}
                >
                  {/* Icon Node */}
                  <div className={`
                    relative z-10 flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-500
                    ${isActive 
                        ? 'bg-indigo-600 border-indigo-600 shadow-glow-primary scale-110 text-white' 
                        : isCompleted 
                            ? 'bg-slate-900 border-slate-900 text-white' 
                            : 'bg-white border-slate-200 text-slate-400 group-hover:border-slate-300'}
                  `}>
                    {isCompleted ? (
                        <Check className="w-4 h-4" />
                    ) : (
                        <span className="text-xs font-bold font-mono">{step.id}</span>
                    )}
                  </div>

                  {/* Text */}
                  <div className="ml-4 flex flex-col">
                    <span className={`text-sm font-bold transition-colors duration-300 ${isActive ? 'text-indigo-950' : isCompleted ? 'text-slate-700' : 'text-slate-400'}`}>
                      {step.title}
                    </span>
                    {isActive && (
                      <span className="text-[10px] font-medium text-indigo-500 animate-pulse">
                        {t('step.processing')}
                      </span>
                    )}
                  </div>

                  {/* Active Indicator Bar */}
                  {isActive && (
                    <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};