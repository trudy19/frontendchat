import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { FetchConversations } from "./Actions/ConversationsActions";
import { userSigninReducer } from "./Reducers/UserReducers";

import { FetchConversationsReducer } from "./Reducers/ConversationsReducers";


const initialState = {
  
 //ListJobsFetch:{ JobList :JSON.parse(localStorage.getItem("JobList")||"[]")},
 //ListJobsFetch:{ userInfo :JSON.parse(localStorage.getItem("userInfo")||"[]")}
 // userInfo :JSON.parse(localStorage.getItem("userInfo")||"[]")

};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({

    userSignin:userSigninReducer,  
    listConversationsFetch:FetchConversationsReducer,


  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
