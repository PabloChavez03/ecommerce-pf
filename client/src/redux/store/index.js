import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "../reducers/index";

//el thunk recibe las actions-creators que son functions
const middleware = [thunk];

const store = configureStore({
	reducer: rootReducer,
	middleware: middleware,
	devTools: true,
});

export default store;