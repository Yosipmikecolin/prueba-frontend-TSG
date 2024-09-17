import classes from "./App.module.css";
import Portada from "./assets/Portada.jpeg";

function App() {
  const motoSpots = [
    { id: "M1", status: "empty" },
    { id: "M2", status: "empty" },
    { id: "M3", status: "empty" },
    { id: "M4", status: "empty" },
    { id: "M5", status: "empty" },
  ];

  const carSpots = [
    { id: "C1", status: "empty" },
    { id: "C2", status: "occupied" },
    { id: "C3", status: "empty" },
    { id: "C4", status: "reserved" },
    { id: "C5", status: "empty" },
    { id: "C6", status: "empty" },
  ];

  return (
    <div className={classes["container-home"]}>
      <div className={classes.box1}>
        <div className={classes.parkingSelection}>
          {/* Sección de motos */}
          <div className={classes.categoryTitle}>Motos</div>
          <div className={classes.parkingGrid}>
            {motoSpots.map((spot) => (
              <div
                key={spot.id}
                className={`${classes.spot} ${classes[spot.status]}`}
              >
                {spot.id}
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
                {spot.id}
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
