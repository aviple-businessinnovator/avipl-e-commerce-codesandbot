import React from "react";
import "./Modal.css";
import BackDrop from "../Backdrop/Backdrop";
const Modal = (propes) => {
  return (
    <>
      {<BackDrop show={propes.show} handler={propes.backdropHandler} />}
      <div
        className="Modal"
        style={{
          transform: propes.show ? "translateX(0)" : "translateX(100vw)",
          opacity: propes.show ? "1" : "0",
        }}
      >
        {propes.children}
      </div>
    </>
  );
};

export default Modal;
