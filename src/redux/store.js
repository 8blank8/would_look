import { createStore, compose, applyMiddleware } from "redux";
import reducer from "./reducers";
import ReduxThunk from 'redux-thunk';

const store = createStore(reducer, compose(applyMiddleware(ReduxThunk)));

export default store;