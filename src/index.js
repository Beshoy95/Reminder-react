import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Reminders from "./reducers/reducer";

const store = createStore(Reminders);

ReactDOM.render(
  <>
    <Provider store={store}>
     <App/>
    </Provider>
  </>,
  document.getElementById("root")
);
