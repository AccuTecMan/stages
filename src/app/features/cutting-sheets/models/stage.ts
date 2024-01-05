export interface Stage {
  id: string;
  stage: string;
  order: number;
  date: any;
  notes: string;
  canGoBack: boolean;
  canGoForward: boolean;
}
