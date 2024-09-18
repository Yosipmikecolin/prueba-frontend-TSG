import { CircleX } from "lucide-react";
import classes from "./Form.module.css";
import IconCar from "../../assets/icons/car-side-icon.png";
import IconMoto from "../../assets/icons/motorcycle-side-icon.png";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Place } from "../../interfaces";
import { useMutation } from "@tanstack/react-query";
import { registerVehicle } from "../../api/request";

type Type = "car" | "motorcycle" | undefined;
type TypeValues = "entry_time" | "exit_time" | "plate";
type Category = "electric" | "hybrid" | undefined;

interface Values {
  entry_time: null;
  exit_time: null;
  plate: undefined;
}

interface Props {
  places?: Place[];
  refetch: () => void;
  onClose: () => void;
  cleanValues: () => void;
  values: Values;
  setValues: React.Dispatch<React.SetStateAction<Values>>;
}

export const Form = ({
  places,
  refetch,
  onClose,
  cleanValues,
  values,
  setValues,
}: Props) => {
  const [emptyPlaces, setEmptyPlaces] = useState<Place[]>([]);
  const [category, setCategory] = useState<Category>(undefined);
  const [typeVehicle, setTypeVehicle] = useState<Type>(undefined);
  const [placeEmpty, setPlaceEmpty] = useState<number | undefined>(undefined);

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

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success("Vehículo registrado");
      refetch();
      const time = setTimeout(() => {
        onClose();
        cleanValues();
      }, 1200);

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

  const selectVehicle = (type: Type) => {
    setTypeVehicle(type);
  };

  const selectPlaceEmpty = (id: number) => {
    setPlaceEmpty(id);
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
        discount: category ? "25" : "0",
        entry_time: values.entry_time,
        exit_time: values.exit_time,
        plate: values.plate,
        type: typeVehicle,
        placeId: placeEmpty,
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
                      placeEmpty === id
                        ? classes["place-select"]
                        : classes.place
                    }
                    onClick={() => selectPlaceEmpty(id)}
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
                    category === "electric"
                      ? classes["button-category-select"]
                      : classes["button-category"]
                  }
                  onClick={() => setCategory("electric")}
                >
                  Electrónico
                </button>
                <button
                  type="button"
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
