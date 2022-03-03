import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"
import blogReducer from "./Reducer/blogReducer";

const store = createStore(
    blogReducer,
    compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || compose));

export default store