import * as CONST from "./actionTypes";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const PlatformsReducer = (state = initialState, { type, payload }) => {
  
  switch (type) {
    case CONST.GET_PLATFORMS_FAIL:
      return {
        ...state,
        loading: true,
      };
    case CONST.GET_PLATFORMS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload?.data,
      };
    case CONST.GET_PLATFORMS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default PlatformsReducer;
