import { Timestamp } from "firebase/firestore";

export interface Stage {
  id: string;
  stage: string;
  order: number;
  date: Timestamp;
  notes: string;
  canGoBack: boolean;
  canGoForward: boolean;
}
