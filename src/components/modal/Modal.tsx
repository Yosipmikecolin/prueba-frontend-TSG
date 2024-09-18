"use client";

import classes from "./Modal.module.css";
import { Place } from "../../interfaces";
import { Form } from "../form/Form";
import { useState } from "react";

interface Props {
  visibleModal: boolean;
  onClose: () => void;
  places?: Place[];
  refetch: () => void;
}

const Modal = ({ visibleModal, onClose, places, refetch }: Props) => {
  const [values, setValues] = useState({
    entry_time: null,
    exit_time: null,
    plate: undefined,
  });

  const cleanValues = () => {
    setValues({
      entry_time: null,
      exit_time: null,
      plate: undefined,
    });
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClose();
    cleanValues();
  };

  return (
    visibleModal && (
      <section
        className={classes["container-modal"]}
        onClick={handleContainerClick}
      >
        <div className={classes.form}>
          <Form
            places={places}
            cleanValues={cleanValues}
            onClose={onClose}
            refetch={refetch}
            values={values}
            setValues={setValues}
          />
        </div>
      </section>
    )
  );
};

export default Modal;
