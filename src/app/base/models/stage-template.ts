export interface StageTemplate {
  id: string;
  jobType: string;
  name: string;
  order: number;
  date: Date;
  notes: string;
  canGoBack: boolean;
  canGoForward: boolean;
}
