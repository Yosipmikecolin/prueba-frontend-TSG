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

type Vehicle = "car" | "motorcycle";

const Modal = ({ visibleModal, onClose }: Props) => {
  const [typeVehicle, setTypeVehicle] = useState<Vehicle | undefined>(
    undefined
  );
  const places = [1, 2, 3, 4, 5, 6, 7];

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
    setTypeVehicle(undefined);
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
            <CircleX
              className={classes["icon-close"]}
              onClick={() => {
                onClose();
                setTypeVehicle(undefined);
              }}
            />
            <h1>Selecciona un tipo</h1>
            <div className={classes["container-cards"]}>
              <div
                className={
                  typeVehicle === "car"
                    ? classes["card-vehicle-select"]
                    : classes["card-vehicle"]
                }
                onClick={() => selectVehicle("car")}
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
            {typeVehicle && (
              <>
                <div className={classes["container-inputs"]}>
                  <h2>
                    Precio:
                    {typeVehicle === "car" ? " $120 × hora" : " $62 × hora"}
                  </h2>
                  <div className={classes["conatiner-places"]}>
                    {places.map((place) => (
                      <div key={place} className={classes.place} />
                    ))}
                  </div>
                  <input className={classes.input} placeholder="Placa" />
                  <input
                    className={classes.input}
                    placeholder="Hora de ingreso"
                  />
                  <input
                    className={classes.input}
                    placeholder="Hora de salida"
                  />
                </div>
                <button className={classes["button-modal"]}>
                  Registrar vehiculo
                </button>
              </>
            )}
          </div>
        </form>
      </section>
    )
  );
};

export default Modal;
