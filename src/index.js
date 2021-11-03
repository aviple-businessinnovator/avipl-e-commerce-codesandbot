import React from "react";
import ReactDOM from "react-dom";
import { StateProvider } from "./components/Stateprovider";
import reducer, { initialState } from "./components/reducer";
import App from "./App";

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById("root")
);
