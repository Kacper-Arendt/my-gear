import { IAppStatus } from "./Enums";

export interface IApp {
  status: IAppStatus;
  readonly message?: string;
}
