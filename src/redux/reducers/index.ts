import { combineReducers } from "redux";
import auth from './auth';
import form from './form';
import submissions from './submissions';

const rootReducer = combineReducers({
    auth,
    form,
    submissions
});

export default rootReducer;