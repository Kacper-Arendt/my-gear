export interface IBike {
  readonly userId: string;
  name: string;
  km: number;
}

export interface IFetchedBike extends IBike {
  bikeId: string;
}
