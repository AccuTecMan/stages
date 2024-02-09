import { JobType } from "@app/base/models/job-type";
import { Customer, StageMap } from "@app/base/models";
import { Stage } from "./stage";
import { Timestamp } from "firebase/firestore";

export interface CuttingSheet {
  id: string;
  jobName: string;
  poNumber: string;
  customer: Customer;
  jobType: JobType;
  color: string;
  readyBy: Timestamp;
  createdAt: Timestamp;
  currentStage: StageMap;
  stages: Stage[];
  isActive: boolean;
  notes: string;
}
