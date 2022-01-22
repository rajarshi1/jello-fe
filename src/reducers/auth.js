import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";

export const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: JSON.parse(localStorage.getItem("user")),
  authIsReady: false,
};

export function reducer(state = initialState, action) {
  const { type, payload } = action;
  console.log(type, "type");
  console.log(payload, "payload");
  switch (type) {
    case USER_LOADED:
      if (payload) {
        localStorage.setItem("user", JSON.stringify(payload));
      }
      return {
        ...state,
        isAuthenticated: true,
        authIsReady: true,
        loading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      console.log("sdddfssf");
      if (payload) {
        localStorage.setItem("token", payload.accessToken);
      }
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        authIsReady: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        authIsReady: true,
        loading: false,
      };
    case "AUTH_IS_READY":
      if (payload) {
        localStorage.setItem("token", payload.accessToken);
      }
      return {
        ...state,
        ...payload,
        user: payload,
        authIsReady: true,
        isAuthenticated: true,
        loading: false,
      };
    default:
      return state;
  }
}
