export interface INewBike {
  readonly userId: string;
  name: string;
  km: number;
}

export interface IBike extends INewBike {
  bikeId: string;
  components: Array<IComponent>;
}

export interface IComponent {
  name: string;
  type: string;
  brand: string;
  model: string;
  added: string;
  distance: number;
  notes?: string;
}
