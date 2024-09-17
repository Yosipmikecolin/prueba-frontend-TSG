import classes from "./App.module.css";
import Portada from "./assets/Portada.jpeg";
import IconCarUp from "./assets/icons/car-up-icon.png";
import IconMotoUp from "./assets/icons/motorcycle-up-icon.png";
import { NotebookPen } from "lucide-react";
import { Modal } from "./components";
import { useState } from "react";

function App() {
  const [visibleModal, setVisibleModal] = useState(false);

  const onClose = () => {
    setVisibleModal(false);
  };

  const onOpen = () => {
    setVisibleModal(true);
  };

  const motoSpots = [
    { id: "M1", status: "empty" },
    { id: "M2", status: "empty" },
    { id: "M3", status: "occupied" },
    { id: "M4", status: "empty" },
    { id: "M5", status: "empty" },
  ];

  const carSpots = [
    { id: "C1", status: "empty" },
    { id: "C2", status: "occupied" },
    { id: "C3", status: "empty" },
    { id: "C4", status: "empty" },
    { id: "C5", status: "empty" },
    { id: "C6", status: "empty" },
  ];

  return (
    <div className={classes["container-home"]}>
      <Modal visibleModal={visibleModal} onClose={onClose} />
      <div className={classes.box1}>
        <button className={classes["button-register"]} onClick={onOpen}>
          <NotebookPen color="#3C3D37" />
        </button>
        <div className={classes.parkingSelection}>
          {/* Sección de motos */}
          <div className={classes.categoryTitle}>Motos</div>
          <div className={classes.parkingGrid}>
            {motoSpots.map((spot) => (
              <div
                key={spot.id}
                className={`${classes.spot} ${classes[spot.status]}`}
              >
                {spot.status === "occupied" ? (
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
            {carSpots.map((spot) => (
              <div
                key={spot.id}
                className={`${classes.spot} ${classes[spot.status]}`}
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
      </div>
      <div className={classes.box2}>
        <img src={Portada} />
      </div>
    </div>
  );
}

export default App;
