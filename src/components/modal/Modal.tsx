"use client";
import { CircleX } from "lucide-react";
import classes from "./Modal.module.css";
import IconCar from "../../assets/icons/car-side-icon.png";
import IconMoto from "../../assets/icons/motorcycle-side-icon.png";
import { useEffect, useState } from "react";
import { Place } from "../../interfaces";
import { useMutation } from "@tanstack/react-query";
import { registerVehicle } from "../../api/request";
import DatePicker from "react-datepicker";

interface Props {
  visibleModal: boolean;
  onClose: () => void;
  places?: Place[];
}

type Type = "car" | "motorcycle" | undefined;
type Category = "electric" | "hybrid" | undefined;

const Modal = ({ visibleModal, onClose, places }: Props) => {
  const [emptyPlaces, setEmptyPlaces] = useState<Place[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [category, setCategory] = useState<Category>(undefined);
  const [typeVehicle, setTypeVehicle] = useState<Type>(undefined);
  const [placeEmpty, setPlaceEmpty] = useState("");
  const mutation = useMutation({
    mutationFn: registerVehicle,
  });

  useEffect(() => {
    if (typeVehicle) {
      const emptys = places?.length
        ? places
            .filter((i) => i.status === "empty")
            .filter((b) => b.type === typeVehicle)
        : [];

      setEmptyPlaces(emptys);
    }
  }, [typeVehicle]);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
    cleanValues();
  };

  const handleFormClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const selectVehicle = (type: Type) => {
    setTypeVehicle(type);
  };

  const selectPlaceEmpty = (place: string) => {
    setPlaceEmpty(place);
  };

  const cleanValues = () => {
    setTypeVehicle(undefined);
    setCategory(undefined);
    setStartDate(null);
    setEndDate(null);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (typeVehicle) {
      mutation.mutate({
        discount: "20",
        entry_time: new Date(),
        exit_time: new Date("2024-09-21"),
        plate: "DF783",
        type: typeVehicle,
        placeId: 1,
      });
    }
  };

  return (
    visibleModal && (
      <section
        className={classes["container-modal"]}
        onClick={handleContainerClick}
      >
        <form onSubmit={handleSubmit}>
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
                    {emptyPlaces.map(({ id, place }) => (
                      <div
                        key={id}
                        className={
                          placeEmpty === place
                            ? classes["place-select"]
                            : classes.place
                        }
                        onClick={() => selectPlaceEmpty(place)}
                      >
                        {place}
                      </div>
                    ))}
                  </div>
                  <input className={classes.input} placeholder="Placa" />
                  <DatePicker
                    selected={startDate}
                    showTimeSelect
                    className={classes["date-picker"]}
                    onChange={(date) => setStartDate(date)}
                    placeholderText="Hora de ingreso"
                  />

                  <DatePicker
                    selected={endDate}
                    showTimeSelect
                    className={classes["date-picker"]}
                    onChange={(date) => setEndDate(date)}
                    placeholderText="Hora de salida"
                  />

                  <h3>Categoría</h3>
                  <div className={classes["container-buttons-category"]}>
                    <button
                      className={
                        category === "electric"
                          ? classes["button-category-select"]
                          : classes["button-category"]
                      }
                      onClick={() => setCategory("electric")}
                    >
                      Electrónico
                    </button>
                    <button
                      className={
                        category === "hybrid"
                          ? classes["button-category-select"]
                          : classes["button-category"]
                      }
                      onClick={() => setCategory("hybrid")}
                    >
                      Híbrido
                    </button>
                    {category && <span>-25%</span>}
                  </div>
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
