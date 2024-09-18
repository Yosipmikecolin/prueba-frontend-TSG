import { Place } from "../interfaces";
import axiosConfig from "./config";

export const getPlaces = async () => {
  const response = await axiosConfig.get<Place[]>("/get-places");
  return response.data;
};
