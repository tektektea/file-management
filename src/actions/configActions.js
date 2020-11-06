import {useDispatch} from "react-redux";
import {NOTIFY} from "./constant";

export const Notify=(notify,type,message)=>{
    const dispatch=useDispatch();
    dispatch({
        type:NOTIFY,
        payload:{
            notify,type,message
        }
    })
}

