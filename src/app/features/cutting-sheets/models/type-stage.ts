import { Type } from "./type";

export interface TypeStage {
  id: string;
  jobType: any;
  name: string;
  order: number;
  canGoBack: boolean;
  canGoForward: boolean;
}

export interface TypeStageServer {
  id: string;
  jobType: any;
  name: string;
  order: number;
  canGoBack: boolean;
  canGoForward: boolean;
}
