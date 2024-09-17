"use client";
import { CircleX } from "lucide-react";
import classes from "./Modal.module.css";
import IconCar from "../../assets/icons/car-side-icon.png";
import IconMoto from "../../assets/icons/motorcycle-side-icon.png";
import { useState } from "react";

interface Props {
  visibleModal: boolean;
  onClose: () => void;
}

type Vehicle = "vehicle" | "motorcycle";

const Modal = ({ visibleModal, onClose }: Props) => {
  const [typeVehicle, setTypeVehicle] = useState<Vehicle | undefined>(
    undefined
  );

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
  };

  const handleFormClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const selectVehicle = (type: Vehicle) => {
    setTypeVehicle(type);
  };

  return (
    visibleModal && (
      <section
        className={classes["container-modal"]}
        onClick={handleContainerClick}
      >
        <form>
          <div className={classes["form-modal"]} onClick={handleFormClick}>
            <CircleX className={classes["icon-close"]} onClick={onClose} />
            <h1>Selecciona un tipo</h1>
            <div className={classes["container-cards"]}>
              <div
                className={
                  typeVehicle === "vehicle"
                    ? classes["card-vehicle-select"]
                    : classes["card-vehicle"]
                }
                onClick={() => selectVehicle("vehicle")}
              >
                <img src={IconCar} width={150} />
                <span>Vehículo Ligero</span>
              </div>

              <div
                className={
                  typeVehicle === "motorcycle"
                    ? classes["card-vehicle-select"]
                    : classes["card-vehicle"]
                }
                onClick={() => selectVehicle("motorcycle")}
              >
                <img src={IconMoto} width={100} />
                <span>Motocicletas</span>
              </div>
            </div>

            {typeVehicle && <p>asd</p>}
          </div>
        </form>
      </section>
    )
  );
};

export default Modal;
