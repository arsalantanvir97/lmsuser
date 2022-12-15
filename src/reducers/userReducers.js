import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,NOTIFICATION_SUCCESS
   } from '../constants/userConstants'
   
   export const UserLoginReducer = (state = {}, action) => {
     switch (action.type) {
       case USER_LOGIN_REQUEST:
         return { loading: true }
       case USER_LOGIN_SUCCESS:
         return { loading: false, userInfo: action.payload }
       case USER_LOGIN_FAIL:
         return { loading: false, error: action.payload }
        
         
       case USER_LOGOUT:
         return {}
         case "HANDLE_MODAL":
          return { ...state, modalOpen: action.payload };
        case "HANDLE_IS_VIDEO":
          return { ...state, isVideoCall: action.payload };
        case "HANDLE_INCOMMING_CALL":
          return { ...state, incommingCall: action.payload };
        case "HANDLE_CALL_STATE":
          return { ...state, callState: action.payload };
        case "HANDLE_MUTE_STATE":
          return { ...state, muteState: action.payload };
        case "HANDLE_OUTGOING":
          return { ...state, outgoing: action.payload };
        case "HANDLE_PAYMENT_LOGS":
          return { ...state, paymentLogs: action.payload };
        case "HANDLE_VIDEO_STATE":
          return { ...state, videoState: action.payload };
        case "UNREAD_LENGTH":
          return { ...state, unread_length: action.payload };
       default:
         return state
     }
   }