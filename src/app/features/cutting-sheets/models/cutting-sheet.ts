import { JobType } from "@app/base/models/job-type";
import { Customer } from "@app/features/customers/models";

export interface CuttingSheet {
  id: string;
  jobName: string;
  poNumber: string;
  customer: Customer;
  jobType: JobType;
  color: string;
  readyBy: any;
}
