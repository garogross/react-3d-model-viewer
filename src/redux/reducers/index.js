import {combineReducers} from "redux"
import {ThreeFiberReducer} from "./threeFiberReducer";


export default combineReducers({
    threeFiber: ThreeFiberReducer,

})