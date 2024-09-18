export interface Place {
  id: number;
  status: string;
  place: string;
  type: string;
}

export interface Vehicle {
  plate: string;
  type: string;
  entry_time: Date;
  exit_time: Date;
  discount: string;
  placeId: string;
}
