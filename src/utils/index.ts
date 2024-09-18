import { Place } from "../interfaces";

const applyDiscount = (
  valorOriginal: number,
  porcentajeDescuento: number
): number => {
  return valorOriginal - (valorOriginal * porcentajeDescuento) / 100;
};

export const calculateTotalIncome = (data: Place[]) => {
  let totalIncome = 0;

  data.forEach((slot) => {
    if (slot.vehicle) {
      const entryTime = new Date(slot.vehicle.entry_time);
      const exitTime = new Date(slot.vehicle.exit_time);

      if (!isNaN(entryTime.getTime()) && !isNaN(exitTime.getTime())) {
        const diffInMs = exitTime.getTime() - entryTime.getTime();
        if (diffInMs > 0) {
          const diffInHours = diffInMs / (1000 * 60 * 60);

          let rate = 0;
          if (slot.vehicle.type === "motorcycle") {
            rate = 62;
          } else if (slot.vehicle.type === "car") {
            rate = 120;
          }

          // Calcular el ingreso sin descuento
          let income = diffInHours * rate;

          // Aplicar descuento del 25% si el vehículo tiene discount = "25"
          if (slot.vehicle.discount === "25") {
            income = applyDiscount(income, 25); // Aplica un descuento del 25%
          }

          totalIncome += income;
        }
      }
    }
  });

  return totalIncome;
};
