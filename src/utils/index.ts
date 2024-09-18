import { Place } from "../interfaces";

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

          const income = diffInHours * rate;

          return (totalIncome += income);
        }
      }
    }
  });

  return totalIncome;
};
