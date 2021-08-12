import {combineReducers} from 'redux';
import auth from './authReducer';
import form from './formReducer';
import submissions from './submissionsReducer';
import questions from './questionsReducer';

const rootReducer = combineReducers({
  auth,
  form,
  submissions,
  questions,
});

export default rootReducer;
