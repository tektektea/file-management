import {NOTIFY} from "../actions/constant";

const initialState={
    notify:false,
    type: "info",
    message:""
}
export const configReducer=(state=initialState,action)=>{
    const {payload, type} = action;
    switch (type) {
        case NOTIFY:
            return {
                ...state,
                notify: payload.notify,
                type:payload.type,
                message: payload.message
            }
            break;
        default:
            return {...state}
    }
}
