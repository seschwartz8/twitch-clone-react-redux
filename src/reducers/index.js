import { combineReducers } from 'redux';
// Import redux form's reducer
import { reducer as reduxFormReducer } from 'redux-form';
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer,
  form: reduxFormReducer
});
