export interface StageTemplate {
  id: string;
  jobType: string;
  stage: string;
  order: number;
  date: Date;
  notes: string;
  canGoBack: boolean;
  canGoForward: boolean;
}
