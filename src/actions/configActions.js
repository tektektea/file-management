import {useDispatch} from "react-redux";
import {NOTIFY} from "./constant";

export const NotifyMessage=(notify,type,message)=>{
    return {
        type:NOTIFY,
        payload:{
            notify,type,message
        }
    }
}

