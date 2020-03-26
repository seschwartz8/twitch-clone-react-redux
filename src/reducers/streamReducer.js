import * as type from '../actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case type.FETCH_STREAMS:
      // Use lodash to take the array returned to us and map it to our object of streams
      // Use the id property of each item in the array as its key in the new merged object
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case type.FETCH_STREAM:
      // Using key interpolation to assign the property with key of the id and value of the payload
      return { ...state, [action.payload.id]: action.payload };
    case type.CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case type.EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case type.DELETE_STREAM:
      // Use lodash to remove stream with the id given in the payload
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
