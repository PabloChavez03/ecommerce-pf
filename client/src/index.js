import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<<<<<<< HEAD
	<Provider store={store}>
		<App />
	</Provider>,
=======
  <Provider store={store}>
    <App />
  </Provider>
>>>>>>> e34185731dfe7e926896ce08d95d5b0123bdcf26
);
