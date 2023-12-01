export interface Stage {
  id: string;
  name: string;
  date: Date;
  notes: string;
  isCurrent: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
}
