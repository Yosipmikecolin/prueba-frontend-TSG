import { CircleX } from "lucide-react";
import classes from "./Form.module.css";
import IconCar from "../../assets/icons/car-side-icon.png";
import IconMoto from "../../assets/icons/motorcycle-side-icon.png";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Place, Values } from "../../interfaces";
import { useMutation } from "@tanstack/react-query";
import { registerVehicle, updatedVehicle } from "../../api/request";

type TypeValues =
  | "entry_time"
  | "exit_time"
  | "plate"
  | "type"
  | "category"
  | "place";

interface Props {
  places?: Place[];
  refetch: () => void;
  onClose: () => void;
  cleanValues: () => void;
  values: Values;
  isUpdated: boolean;
  setValues: React.Dispatch<React.SetStateAction<Values>>;
}

export const Form = ({
  places,
  refetch,
  onClose,
  cleanValues,
  values,
  setValues,
  isUpdated,
}: Props) => {
  const [emptyPlaces, setEmptyPlaces] = useState<Place[]>([]);

  const mutation = useMutation({
    mutationFn: isUpdated ? updatedVehicle : registerVehicle,
  });

  useEffect(() => {
    if (values.type) {
      const emptys = places?.length
        ? places
            .filter((i) => i.status === "empty")
            .filter((b) => b.type === values.type)
        : [];

      setEmptyPlaces(emptys);
    }
  }, [values.type]);

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success("Vehículo registrado");
      refetch();
      const time = setTimeout(() => {
        onClose();
        cleanValues();
      }, 1000);

      return () => clearTimeout(time);
    }

    if (mutation.isError) {
      toast.error("Ocurrio un error inesperado");
      console.log("Error", mutation.error);
    }
  }, [mutation.isSuccess, mutation.isError]);

  const handleFormClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const changeValues = (type: TypeValues, value: any) => {
    setValues({ ...values, [type]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      values.type &&
      values.place &&
      values.entry_time &&
      values.plate &&
      values.exit_time
    ) {
      mutation.mutate({
        id: places?.find((i) => i.id === values.place)?.id,
        discount: values.category ? "25" : "0",
        entry_time: values.entry_time,
        exit_time: values.exit_time,
        plate: values.plate,
        type: values.type,
        placeId: values.place,
      });
    } else {
      toast("Llena todos los campos");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div onClick={handleFormClick}>
        <CircleX
          className={classes["icon-close"]}
          onClick={() => {
            onClose();
            cleanValues();
          }}
        />
        <h1>Selecciona un tipo</h1>
        <div className={classes["container-cards"]}>
          <div
            className={
              values.type === "car"
                ? classes["card-vehicle-select"]
                : classes["card-vehicle"]
            }
            onClick={() => changeValues("type", "car")}
          >
            <img src={IconCar} width={150} />
            <span>Vehículo Ligero</span>
          </div>

          <div
            className={
              values.type === "motorcycle"
                ? classes["card-vehicle-select"]
                : classes["card-vehicle"]
            }
            onClick={() => changeValues("type", "motorcycle")}
          >
            <img src={IconMoto} width={100} />
            <span>Motocicletas</span>
          </div>
        </div>
        {values.type && (
          <>
            <div className={classes["container-inputs"]}>
              <h2>
                Precio:
                {values.type === "car" ? " $120 × hora" : " $62 × hora"}
              </h2>
              <hr />
              {isUpdated ? (
                <>
                  <h3>Plaza actual</h3>
                  <div className={classes["conatiner-places"]}>
                    <div className={classes["place-select"]}>
                      {places?.find((i) => i.id === values.place)?.place}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h3>Plazas disponibles</h3>
                  <div className={classes["conatiner-places"]}>
                    {emptyPlaces.map(({ id, place }) => (
                      <div
                        key={id}
                        className={
                          values.place === id
                            ? classes["place-select"]
                            : classes.place
                        }
                        onClick={() => changeValues("place", id)}
                      >
                        {place}
                      </div>
                    ))}
                  </div>
                </>
              )}

              <input
                className={classes.input}
                placeholder="Placa"
                value={values.plate}
                onChange={(e) => {
                  changeValues("plate", e.target.value);
                }}
              />
              <DatePicker
                selected={values.entry_time}
                showTimeSelect
                className={classes["date-picker"]}
                onChange={(date) => changeValues("entry_time", date)}
                placeholderText="Hora de ingreso"
              />

              <DatePicker
                selected={values.exit_time}
                showTimeSelect
                className={classes["date-picker"]}
                onChange={(date) => changeValues("exit_time", date)}
                placeholderText="Hora de salida"
              />

              <h3>Categoría</h3>
              <div className={classes["container-buttons-category"]}>
                <button
                  type="button"
                  className={
                    values.category === "electric_hybrid"
                      ? classes["button-category-select"]
                      : classes["button-category"]
                  }
                  onClick={() =>
                    values.category === "electric_hybrid"
                      ? changeValues("category", undefined)
                      : changeValues("category", "electric_hybrid")
                  }
                >
                  Electrónico o Híbrido
                </button>
                {values.category && <span>-25%</span>}
              </div>
            </div>
            <button type="submit" className={classes["button-modal"]}>
              {mutation.isPending ? (
                <div className={classes.loader} />
              ) : (
                "Registrar vehículo"
              )}
            </button>
          </>
        )}
      </div>
    </form>
  );
};
