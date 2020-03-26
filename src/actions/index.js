import * as type from './types';

export const signIn = () => {
  return {
    type: type.SIGN_IN
  };
};

export const signOut = () => {
  return {
    type: type.SIGN_OUT
  };
};
