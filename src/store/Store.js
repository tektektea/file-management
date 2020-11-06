import {createStore,combineReducers} from "redux";
import {configReducer} from "../reducers/configReducer";

const reducers=combineReducers({
    configData:configReducer
})
const Store = createStore(reducers);
export default Store;
