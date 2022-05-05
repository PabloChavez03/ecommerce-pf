import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducer from "../reducers/index";

//el thunk recibe las actions-creators que son functions
const middleware = [thunk];

const store = configureStore({
	reducer: reducer,
	middleware: middleware,
	devTools: true,
});

export default store;
