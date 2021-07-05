import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { tokenReducer } from "../reducers";
export const store = createStore(tokenReducer, applyMiddleware(thunk));
