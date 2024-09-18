"use client";

import classes from "./Modal.module.css";
import { Place, Values } from "../../interfaces";
import { useState } from "react";
import { Form } from "../../components";

interface Props {
  visibleModal: boolean;
  onClose: () => void;
  places?: Place[];
  refetch: () => void;
}

const Modal = ({ visibleModal, onClose, places, refetch }: Props) => {
  const [values, setValues] = useState<Values>({
    entry_time: null,
    exit_time: null,
    plate: undefined,
    type: undefined,
    category: undefined,
  });

  const cleanValues = () => {
    setValues({
      entry_time: null,
      exit_time: null,
      plate: undefined,
      type: undefined,
      category: undefined,
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
