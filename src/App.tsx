import classes from "./App.module.css";
import Portada from "./assets/Portada.jpeg";
import IconCarUp from "./assets/icons/car-up-icon.png";
import IconMotoUp from "./assets/icons/motorcycle-up-icon.png";
import { BookOpenCheck, NotebookPen } from "lucide-react";
import { Modal, ModalTotal } from "./components";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPlaces } from "./api/request";
import { Values, Vehicle } from "./interfaces";

function App() {
  const [visibleModal, setVisibleModal] = useState(false);
  const [visibleModalTotal, setVisibleModalTotal] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [values, setValues] = useState<Values>({
    entry_time: null,
    exit_time: null,
    plate: undefined,
    type: undefined,
    category: undefined,
  });
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["places"],
    queryFn: getPlaces,
  });

  const onClose = () => {
    setVisibleModal(false);
    setVisibleModalTotal(false);
    setIsUpdated(false);
  };

  const onOpenModalTotal = () => {
    setVisibleModalTotal(true);
  };

  const onOpenModal = () => {
    setVisibleModal(true);
  };

  const motoSpots = data
    ?.filter((a) => a.type === "motorcycle")
    .map((b) => ({ id: b.place, status: b.status, vehicle: b.vehicle }));

  const carSpots = data
    ?.filter((a) => a.type === "car")
    .map((b) => ({ id: b.place, status: b.status, vehicle: b.vehicle }));

  const openVehicle = (vehicle: Vehicle | null) => {
    if (vehicle) {
      setIsUpdated(true);
      setValues({
        entry_time: new Date(vehicle.entry_time),
        exit_time: new Date(vehicle.exit_time),
        plate: vehicle.plate,
        type: vehicle.type as never,
        category: vehicle.discount === "25" ? "electric_hybrid" : undefined,
        place: vehicle.placeId,
      });

      setVisibleModal(true);
    }
  };

  return (
    <div className={classes["container-home"]}>
      <ModalTotal
        refetch={refetch}
        visibleModal={visibleModalTotal}
        places={data}
        onClose={onClose}
      />
      <Modal
        visibleModal={visibleModal}
        onClose={onClose}
        places={data}
        refetch={refetch}
        values={values}
        setValues={setValues}
        isUpdated={isUpdated}
      />
      <div className={classes.box1}>
        {isLoading ? (
          <div className={classes.loader} />
        ) : (
          <>
            <button
              className={classes["button-total"]}
              onClick={onOpenModalTotal}
            >
              <BookOpenCheck color="#3C3D37" />
            </button>

            <button
              className={classes["button-register"]}
              onClick={onOpenModal}
            >
              <NotebookPen color="#3C3D37" />
            </button>
            <div className={classes.parkingSelection}>
              {/* Sección de motos */}
              <div className={classes.categoryTitle}>Motos</div>
              <div className={classes.parkingGrid}>
                {motoSpots?.map((spot) => (
                  <div
                    key={spot.id}
                    className={`${classes.spot} ${classes[spot.status]}`}
                    onClick={() => openVehicle(spot.vehicle)}
                  >
                    {spot.vehicle ? (
                      <img src={IconMotoUp} width={43} />
                    ) : (
                      spot.id
                    )}
                  </div>
                ))}
              </div>

              {/* Sección de carros */}
              <div className={classes.categoryTitle}>Carros</div>
              <div className={classes.parkingGrid}>
                {carSpots?.map((spot) => (
                  <div
                    key={spot.id}
                    className={`${classes.spot} ${classes[spot.status]}`}
                    onClick={() => openVehicle(spot.vehicle)}
                  >
                    {spot.status === "occupied" ? (
                      <img src={IconCarUp} width={40} />
                    ) : (
                      spot.id
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <div className={classes.box2}>
        <img src={Portada} />
      </div>
    </div>
  );
}

export default App;
