import { Stage } from "./stage";

export interface CuttingSheet {
  id: string;
  name: string;
  customer: string;
  type: string;
  color: string;
  stages: Stage[];
}
