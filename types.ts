export interface Step {
  id: number;
  title: string;
  status: 'completed' | 'current' | 'upcoming';
  description?: string;
}

export interface TaskBasicInfo {
  type: string;
  scenario: string;
  template: string;
  time: string;
  remark: string;
}

export interface TaskDetailItem {
  id: number;
  stepId: number;
  label: string;
  isNormal: boolean | null; // null for unselected
  remark: string;
  beforeImages: string[];
  afterImages: string[];
}
