export interface Stage {
  id: string;
  name: string;
  date: Date;
  notes: string;
  canGoBack: boolean;
  canGoForward: boolean;
}
