import { Timestamp } from "firebase/firestore";

export interface StageTemplate {
  id: string;
  jobType: string;
  stage: string;
  order: number;
  date: Timestamp;
  notes: string;
  canGoBack: boolean;
  canGoForward: boolean;
}
