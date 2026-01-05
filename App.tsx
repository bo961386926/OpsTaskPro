import React, { useState } from 'react';
import { Header } from './components/Header';
import { BasicInfoCard } from './components/BasicInfoCard';
import { StepSidebar } from './components/StepSidebar';
import { DetailForm } from './components/DetailForm';
import { TaskDetailView } from './components/TaskDetailView';
import { Step, TaskBasicInfo, TaskDetailItem } from './types';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

// Mock Data Factories
const getBasicInfo = (lang: 'zh' | 'en'): TaskBasicInfo => ({
  type: lang === 'zh' ? "例行维护" : "Maintenance",
  scenario: lang === 'zh' ? "7G区 - 冷却系统" : "Sector 7G - Cooling Systems",
  template: lang === 'zh' ? "标准协议 A1" : "Standard Protocol A1",
  time: "2025-11-01 11:08:20",
  remark: ""
});

const getSteps = (lang: 'zh' | 'en'): Step[] => [
  { id: 1, title: lang === 'zh' ? "身份验证" : "Identity Verification", status: "completed" },
  { id: 2, title: lang === 'zh' ? "系统诊断" : "System Diagnostics", status: "current" },
  { id: 3, title: lang === 'zh' ? "组件维修" : "Component Repair", status: "upcoming" },
  { id: 4, title: lang === 'zh' ? "校准" : "Calibration", status: "upcoming" },
  { id: 5, title: lang === 'zh' ? "签署" : "Sign-off", status: "upcoming" },
];

const getDetail = (lang: 'zh' | 'en'): TaskDetailItem => ({
  id: 101,
  stepId: 2,
  label: lang === 'zh' ? "系统诊断" : "System Diagnostics",
  isNormal: null,
  remark: lang === 'zh' 
    ? "发现4号压力阀有微小波动。已调整至标准运行范围。建议接下来的24小时内持续监控。其他指标均在安全参数内。"
    : "Found minor fluctuations in pressure valve #4. Adjusted to standard operating range. Monitoring recommended for next 24 hours. All other metrics within safety parameters.",
  beforeImages: [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
  ],
  afterImages: [
     "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop"
  ]
});

// Main Content Component separate from Provider
const MainContent: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(2);
  const [isViewMode, setIsViewMode] = useState<boolean>(false);
  const { language } = useLanguage();

  const basicInfo = getBasicInfo(language);
  const steps = getSteps(language);
  const detail = getDetail(language);

  return (
    <div className="min-h-screen font-sans pb-24 pt-32 selection:bg-indigo-500 selection:text-white transition-colors duration-500">
      <Header isViewMode={isViewMode} onToggleMode={() => setIsViewMode(!isViewMode)} />

      {/* 
         Panoramic Layout Adjustments:
         1. Edit Mode: Expanded from 1400px to 1800px max-width to fill 1080p width naturally.
         2. View Mode: Expanded from 5xl (1024px) to 7xl (1280px) for a grander document feel.
      */}
      <main className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-in-out ${isViewMode ? 'max-w-7xl' : 'max-w-[1800px]'}`}>
        
        {/* Info Strip */}
        <BasicInfoCard info={basicInfo} />

        {/* Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-16 items-start mt-4 relative">
          
          {/* Left Navigation */}
          <div className={`hidden lg:block transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isViewMode ? 'w-0 opacity-0 -translate-x-10 overflow-hidden' : 'w-72 2xl:w-96 opacity-100 translate-x-0'}`}>
             <StepSidebar 
                steps={steps} 
                currentStepId={currentStep} 
                onStepClick={setCurrentStep} 
            />
          </div>

          {/* Main Workspace */}
          <div className="flex-1 w-full min-w-0">
            {isViewMode ? (
                <TaskDetailView detail={{...detail, isNormal: true}} basicInfo={basicInfo} />
            ) : (
                <DetailForm detail={detail} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
};

export default App;