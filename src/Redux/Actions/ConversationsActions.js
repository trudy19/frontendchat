

import { FETCH_CONVERSATIONS_REQUEST,FETCH_CONVERSATIONS_SUCCESS,FETCH_CONVERSATIONS_FAIL } from "../types";
    import Axios from "axios";


export const FetchConversations=()=>async(dispatch,getState)=>{

    try{
    //  dispatch({ type: FETCH_CONVERSATIONS_REQUEST});
    const { userSignin: { userInfo } } = getState();
    const {data}   = await Axios.post("http://192.168.1.10:9000/user/chatconversation/" ,{"userId":userInfo.userId,"username":userInfo.username}    );
  
    dispatch({ type: FETCH_CONVERSATIONS_SUCCESS, payload: data});
    localStorage.setItem("conversations",JSON.stringify(data));
 
  
  
  
  }catch(error){
    dispatch({ type: FETCH_CONVERSATIONS_FAIL, payload: error.message });
  }
  }
  