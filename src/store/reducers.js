import { combineReducers } from "redux";
import LoginReducer from "./Login/reducer";
import PlatformsReducer from "./Platform/reducer";

const rootReducer = combineReducers({
  login: LoginReducer,
  platform: PlatformsReducer,
});

export default rootReducer;
