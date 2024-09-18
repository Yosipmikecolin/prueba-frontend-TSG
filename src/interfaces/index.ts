export interface Place {
  id: number;
  status: string;
  place: string;
  type: string;
  vehicle: Vehicle | null;
}

export interface Vehicle {
  id?: number;
  plate: string;
  type: string;
  entry_time: Date;
  exit_time: Date;
  discount: string;
  placeId: number;
}

export interface Incomes {
  id: number;
  date: Date;
  total: string;
}
export interface Income {
  date: Date;
  total: string;
}

export interface Values {
  entry_time: null | Date;
  exit_time: null | Date;
  plate: undefined | string;
  type?: "car" | "motorcycle";
  place?: number;
  category?: "electric_hybrid";
}
