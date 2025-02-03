import * as CONST from "./actionTypes";

export const getPlatforms = (payload) => {
  return {
    type: CONST.GET_PLATFORMS,
    payload,
  };
};

export const getPlatforms_Success = (payload) => ({
  type: CONST.GET_PLATFORMS_SUCCESS,
  payload,
});

export const getPlatforms_Fail = (payload) => ({
  type: CONST.GET_PLATFORMS_FAIL,
  payload,
});
