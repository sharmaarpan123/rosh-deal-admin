import { combineReducers } from "redux";
import LoginReducer from "./Login/reducer";
import chatReducer from "./chat/reducer";

const rootReducer = combineReducers({
  login: LoginReducer,
  chat: chatReducer,
});

export default rootReducer;
