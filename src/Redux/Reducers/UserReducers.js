import {  USER_LOGOUT, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from "../types";




function userSigninReducer(state = {userInfo:JSON.parse(localStorage.getItem('userInfo'))}, action) {
    //userSignin:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null

switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true,error:true };
    case USER_SIGNIN_SUCCESS:
       return { loading: false, userInfo: action.payload,error:true};
    case USER_SIGNIN_FAIL:
       return { loading: false,error:true};
    case USER_LOGOUT:
       return {};
 
  default: return state;
}
}

export {
    userSigninReducer
  }