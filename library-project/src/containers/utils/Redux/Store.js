import { createStore } from "redux";
import reducer from "./Reducer";

const initialState = { orders: [], totalPrice: 0 };

const store = createStore(reducer, initialState);

export default store;
