import { combineReducers } from "redux";
import LoginReducer from "./Login/reducer";


const rootReducer = combineReducers({
  login: LoginReducer,
});

export default rootReducer;
