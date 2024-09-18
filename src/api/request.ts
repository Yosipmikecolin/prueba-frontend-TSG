import { Income, Incomes, Place, Vehicle } from "../interfaces";
import axiosConfig from "./config";

export const getPlaces = async () => {
  const response = await axiosConfig.get<Place[]>("/get-places");
  return response.data;
};

export const registerVehicle = async (data: Vehicle) => {
  const response = await axiosConfig.post("/register-vehicle", data);
  return response.data;
};

export const updatedVehicle = async (data: Vehicle) => {
  const response = await axiosConfig.post("/updated-vehicle", data);
  return response.data;
};

export const getIncomes = async () => {
  const response = await axiosConfig.get<Incomes[]>("/get-incomes");
  return response.data;
};

export const registerIncome = async (data: Income) => {
  const response = await axiosConfig.post("/register-income", data);
  return response.data;
};
