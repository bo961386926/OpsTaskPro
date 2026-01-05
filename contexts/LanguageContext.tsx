import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  zh: {
    // Nav & Header
    'app.title': 'OpsTaskPro',
    'nav.operations': '运维中心',
    'nav.taskEntry': '作业填报',
    'nav.taskReport': '作业报告',
    'status.online': '系统在线',
    'btn.switchToEdit': '切换至编辑',
    'btn.previewReport': '预览报告',
    
    // Basic Info
    'info.placeholder': '添加快速备注...',
    
    // Sidebar
    'sidebar.title': '进度追踪',
    'step.processing': '处理中...',
    
    // Detail Form
    'detail.stepPrefix': '步骤',
    'detail.inspectionOutcome': '检查结果',
    'detail.normal': '正常',
    'detail.normalDesc': '系统各项指标运行正常',
    'detail.abnormal': '异常',
    'detail.abnormalDesc': '需要立即关注或维修',
    'detail.fieldNotes': '现场备注',
    'detail.fieldNotesPlaceholder': '请输入详细的巡检观察记录...',
    'detail.markdown': '支持 MARKDOWN',
    'detail.visualEvidence': '现场影像',
    'detail.uploadDesc': '上传现场高清照片以供存档。',
    'detail.preMaintenance': '维护前',
    'detail.postMaintenance': '维护后',
    'btn.saveDraft': '保存草稿',
    'btn.nextStep': '下一步',
    
    // Image Uploader
    'img.upload': '上传图片',
    
    // View Mode (Certificate)
    'view.passed': '检查通过',
    'view.abnormalDetected': '发现异常',
    'view.passedDesc': '所有系统在正常参数范围内运行。',
    'view.abnormalDesc': '检测到关键指标异常，需立即维护。',
    'view.officialRecord': '官方记录',
    'view.analysisComplete': '分析已完成。数字签名已验证。',
    'view.verified': '已验证',
    'view.flagged': '已标记',
    'view.execSummary': '执行摘要',
    'view.defaultRemark': '无额外备注。标准操作检查已成功完成。',
    'view.visualVerification': '视觉验证',
    'view.synced': '云端同步',
    'view.preCondition': '维护前状况',
    'view.postCondition': '维护后状况',
    'view.raw': '原图',
    'view.metadataAudit': '元数据审计',
    'view.stepRef': '步骤索引',
    'view.scenario': '场景上下文',
    'view.timestamp': '服务器时间',
    'view.personnel': '授权人员',
    'view.accessLevel': 'L4 访问权限',
    'btn.exportPDF': '导出 PDF 报告',
    'btn.shareLink': '分享安全链接',
  },
  en: {
    // Nav & Header
    'app.title': 'OpsTaskPro',
    'nav.operations': 'Operations',
    'nav.taskEntry': 'Task Entry',
    'nav.taskReport': 'Task Report',
    'status.online': 'System Online',
    'btn.switchToEdit': 'Switch to Edit',
    'btn.previewReport': 'Preview Report',
    
    // Basic Info
    'info.placeholder': 'Add a quick note...',
    
    // Sidebar
    'sidebar.title': 'Progress Track',
    'step.processing': 'Processing...',
    
    // Detail Form
    'detail.stepPrefix': 'Step',
    'detail.inspectionOutcome': 'Inspection Outcome',
    'detail.normal': 'Normal',
    'detail.normalDesc': 'System operating normally',
    'detail.abnormal': 'Abnormal',
    'detail.abnormalDesc': 'Requires immediate attention',
    'detail.fieldNotes': 'Field Notes',
    'detail.fieldNotesPlaceholder': 'Enter detailed observations regarding the inspection...',
    'detail.markdown': 'MARKDOWN SUPPORTED',
    'detail.visualEvidence': 'Visual Evidence',
    'detail.uploadDesc': 'Upload high-resolution images of the site condition.',
    'detail.preMaintenance': 'Pre-Maintenance',
    'detail.postMaintenance': 'Post-Maintenance',
    'btn.saveDraft': 'Save as draft',
    'btn.nextStep': 'Next Step',
    
    // Image Uploader
    'img.upload': 'Upload Image',
    
    // View Mode (Certificate)
    'view.passed': 'Passed Inspection',
    'view.abnormalDetected': 'Abnormal Detected',
    'view.passedDesc': 'All systems operating within normal parameters.',
    'view.abnormalDesc': 'Immediate maintenance required.',
    'view.officialRecord': 'Official Record',
    'view.analysisComplete': 'Analysis completed successfully. Digital signature verified.',
    'view.verified': 'VERIFIED',
    'view.flagged': 'FLAGGED',
    'view.execSummary': 'Executive Summary',
    'view.defaultRemark': 'No additional remarks provided. Standard operational check completed successfully.',
    'view.visualVerification': 'Visual Verification',
    'view.synced': 'SYNCED_CLOUD_STORAGE',
    'view.preCondition': 'PRE-CONDITION',
    'view.postCondition': 'POST-CONDITION',
    'view.raw': 'RAW',
    'view.metadataAudit': 'Metadata Audit',
    'view.stepRef': 'Step Reference',
    'view.scenario': 'Scenario Context',
    'view.timestamp': 'Server Timestamp',
    'view.personnel': 'Authorized Personnel',
    'view.accessLevel': 'L4 Access',
    'btn.exportPDF': 'Export PDF Report',
    'btn.shareLink': 'Share Secure Link',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh'); // Default to Chinese

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['zh']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};