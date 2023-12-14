import { Type } from "./type";

export interface StageTemplate {
  id: string;
  jobType: string;
  name: string;
  order: number;
  date: Date;
  notes: string;
  canGoBack: boolean;
  canGoForward: boolean;
}

export interface StageTemplateServer {
  id: string;
  jobType: string;
  name: string;
  order: number;
  date: Date;
  notes: string;
  canGoBack: boolean;
  canGoForward: boolean;
}
