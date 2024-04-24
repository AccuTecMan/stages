import { Timestamp } from "firebase/firestore";
import { StageMap } from "./";

export interface StageTemplate {
  id: string;
  jobType: string;
  stageMap: StageMap;
  order: number;
  date: Timestamp;
  notes: string;
  canGoBack: boolean;
  canGoForward: boolean;
}
