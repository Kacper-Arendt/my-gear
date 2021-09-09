import { AppStatus } from "./Models";

export interface IApp {
    status: AppStatus,
    readonly message?: string,
}