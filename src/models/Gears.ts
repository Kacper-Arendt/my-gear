export interface INewBike {
  readonly userId: string;
  name: string;
  km: number;
}

export interface IBike extends INewBike {
  bikeId: string;
}
