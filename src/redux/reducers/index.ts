import {combineReducers} from 'redux';
import auth from './authReducer';
import form from './formReducer';
import submissions from './submissionsReducer';
import questions from './questionsReducer';
import {localizeReducer} from 'react-localize-redux';

const rootReducer = combineReducers({
  auth: auth,
  form: form,
  submissions: submissions,
  questions: questions,
  localize: localizeReducer,
});

export default rootReducer;
