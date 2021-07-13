

import { FETCH_CONVERSATIONS_REQUEST,FETCH_CONVERSATIONS_SUCCESS,FETCH_CONVERSATIONS_FAIL } from "../types";



function FetchConversationsReducer(state={conversations:JSON.parse(localStorage.getItem('conversations'))}, action) {
    //response:JSON.parse(localStorage.getItem('JobList'))
        switch (action.type) {
          case FETCH_CONVERSATIONS_REQUEST:
            return { loading: true };
          case FETCH_CONVERSATIONS_SUCCESS:
            //localStorage.setItem("conversations",JSON.stringify(action.payload));

            return { loading: false, conversations: action.payload };
          case FETCH_CONVERSATIONS_FAIL:
            return {loading: false};
        
          default: return state;
        }
        }


        export {
            FetchConversationsReducer
          } 