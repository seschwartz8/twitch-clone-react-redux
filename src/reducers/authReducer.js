import * as type from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case type.SIGN_IN:
      return { ...state, isSignedIn: true };
    case type.SIGN_OUT:
      return { ...state, isSignedIn: false };
    default:
      return state;
  }
};
