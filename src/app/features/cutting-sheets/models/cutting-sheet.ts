import { JobType } from "@app/base/models/job-type";
import { Customer } from "@app/base/models";
import { CurrentStage } from "./current-stage";
import { Stage } from "./stage";

export interface CuttingSheet {
  id: string;
  jobName: string;
  poNumber: string;
  customer: Customer;
  jobType: JobType;
  color: string;
  readyBy: any;
  currentStage: CurrentStage;
  stages: Stage[];
}
