import { combineReducers } from 'redux';
// Import redux form's reducer
import { reducer as reduxFormReducer } from 'redux-form';
import authReducer from './authReducer';
import streamReducer from './streamReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxFormReducer,
  streams: streamReducer,
});
