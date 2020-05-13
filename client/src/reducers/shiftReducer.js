import { GET_SHIFT_BY_ID, GET_SHIFTS, SHIFT_ERROR } from "actions/types";

const initialState = {
  shift: null,
  shifts: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SHIFT_BY_ID:
      return {
        ...state,
        shift: payload,
        loading: false
      };
    case GET_SHIFTS:
      return {
        ...state,
        shifts: payload,
        loading: false
      };
    case SHIFT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
