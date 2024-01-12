import { StageMap } from "@app/base/models";
import { Timestamp } from "firebase/firestore";

export interface Stage {
  id: string;
  stageMap: StageMap;
  order: number;
  date: Timestamp;
  notes: string;
  canGoBack: boolean;
  canGoForward: boolean;
}
