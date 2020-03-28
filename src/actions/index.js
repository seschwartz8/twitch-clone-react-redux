import * as type from './types';
import streams from '../apis/streams';
import history from '../history';

export const signIn = userId => {
  return {
    type: type.SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: type.SIGN_OUT
  };
};

export const createStream = formValues => {
  return async (dispatch, getState) => {
    // POST request with axios to create new stream with userId
    const { userId } = getState().auth;
    const response = await streams.post('/streams', { ...formValues, userId });
    dispatch({
      type: type.CREATE_STREAM,
      payload: response.data
    });
    // Navigate the user back to list of streams (only after API request is resolved)
    history.push('/');
  };
};

export const fetchStreams = () => {
  return async dispatch => {
    // GET request with axios to fetch all streams
    const response = await streams.get('/streams');
    dispatch({
      type: type.FETCH_STREAMS,
      payload: response.data
    });
  };
};

export const fetchStream = id => {
  return async dispatch => {
    // GET request with axios to fetch specific stream
    const response = await streams.get(`/streams/${id}`);
    dispatch({
      type: type.FETCH_STREAM,
      payload: response.data
    });
  };
};

export const editStream = (id, formValues) => {
  return async dispatch => {
    // PUT request with axios to edit specific stream with new formValues
    const response = await streams.put(`/streams/${id}`, formValues);
    dispatch({
      type: type.EDIT_STREAM,
      payload: response.data
    });
  };
};

export const deleteStream = id => {
  return async dispatch => {
    // DELETE request with axios to edit specific stream with new formValues
    await streams.delete(`/streams/${id}`);
    dispatch({
      type: type.DELETE_STREAM,
      payload: id
    });
  };
};
