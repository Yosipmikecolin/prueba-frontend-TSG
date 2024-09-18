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
type TypeValues = "startDate" | "endDate" | "plate";
type Category = "electric" | "hybrid" | undefined;

const Modal = ({ visibleModal, onClose, places }: Props) => {
  const [emptyPlaces, setEmptyPlaces] = useState<Place[]>([]);
  const [category, setCategory] = useState<Category>(undefined);
  const [typeVehicle, setTypeVehicle] = useState<Type>(undefined);
  const [placeEmpty, setPlaceEmpty] = useState("");
  const [values, setValues] = useState({
    entry_time: null,
    exit_time: null,
    plate: undefined,
  });

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
  };

  const changeValues = (type: TypeValues, value: any) => {
    setValues({ ...values, [type]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      typeVehicle &&
      placeEmpty &&
      values.entry_time &&
      values.exit_time &&
      values.plate
    ) {
      mutation.mutate({
        discount: "20",
        entry_time: values.entry_time,
        exit_time: values.exit_time,
        plate: values.plate,
        type: typeVehicle,
        placeId: placeEmpty,
      });
      console.log("values", values);
    } else {
      alert("LLena todos los campos");
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
                  <input
                    className={classes.input}
                    placeholder="Placa"
                    onChange={(e) => {
                      changeValues("plate", e.target.value);
                    }}
                  />
                  <DatePicker
                    selected={values.entry_time}
                    showTimeSelect
                    className={classes["date-picker"]}
                    onChange={(date) => changeValues("startDate", date)}
                    placeholderText="Hora de ingreso"
                  />

                  <DatePicker
                    selected={values.exit_time}
                    showTimeSelect
                    className={classes["date-picker"]}
                    onChange={(date) => changeValues("endDate", date)}
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
