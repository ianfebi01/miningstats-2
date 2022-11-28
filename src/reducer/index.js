import { combineReducers } from "redux";
import { DataReducer } from "./dataReducer";
import { MessageReducer } from "./message";
import { UserReducer } from "./userReducer";

const rootReducer = combineReducers({
  user: UserReducer,
  data: DataReducer,
  message: MessageReducer,
});

export default rootReducer;
