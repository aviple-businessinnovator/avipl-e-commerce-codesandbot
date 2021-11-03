import React from "react";
import "./Backdrop.css";

const BackDrop = (propes) => {
  return propes.show ? (
    <div className="Backdrop" onClick={propes.handler}></div>
  ) : null;
};

export default BackDrop;
