import { AppStatus } from "./Enums";

export interface IApp {
  status: AppStatus;
  readonly message?: string;
}
