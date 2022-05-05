import { combineReducers } from "redux";
import adminReducer from "./admin.js";
import ecommerceReducer from "./ecommerce";

export default combineReducers({
  adminReducer,
  ecommerceReducer
});