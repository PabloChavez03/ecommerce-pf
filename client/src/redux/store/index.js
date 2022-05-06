import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "../reducers/index";
import  localStorage  from  'redux-persist/lib/storage' ;
import {persistReducer, persistStore} from "redux-persist";
//el thunk recibe las actions-creators que son functions
const middleware = [thunk];

const persistConfig = {
	key: "root",
	storage: localStorage
  }

const persistedReducer   = persistReducer(persistConfig, rootReducer);

// export default () => {
	
// }

// export default function pers() {
// 	const store = configureStore({
// 		reducer: persistedReducer,
// 		middleware: middleware,
// 		devTools: true,
// 	})
// 	let persistor = persistStore(store)
//   return { store, persistor }
// }


export const store = configureStore({
	reducer: persistedReducer,
	middleware: middleware,
	devTools: true,
  });
  
export const persistor = persistStore(store);