import produce from 'immer';
import * as type from '../actionTypes';
import {IActionInterface} from '../../Interfaces/actionInterface';

interface IDraft {
  [key: string]: string | number | boolean;
}

const initialState = {
  appKey: '',
  loading: false,
  errorMessage: '',
};

export default (state = initialState, action: IActionInterface) =>
  produce(state, (draft: IDraft) => {
    switch (action.type) {
      case type.USER_LOGIN_REQUEST: {
        draft.loading = true;
        draft.errorMessage = '';
        break;
      }
      case type.USER_LOGIN_SUCCESS: {
        Object.keys(action.payload).forEach(key => {
          draft[key] = action.payload[key];
        });
        draft.loading = false;
        draft.errorMessage = '';
        break;
      }
      case type.USER_LOGIN_FAIL: {
        draft.loading = false;
        draft.errorMessage = action.error;
        break;
      }
      case type.USER_LOGOUT_SUCCESS: {
        draft.loading = false;
        draft.errorMessage = '';
        draft.appKey = '';
        break;
      }
      case type.USER_LOGOUT_REQUEST: {
        draft.loading = false;
        draft.errorMessage = '';
        draft.appKey = '';
        break;
      }
      case type.USER_LOGOUT_FAIL: {
        draft.loading = false;
        draft.errorMessage = 'Something went wrong!';
        break;
      }
      default:
        return state;
    }
  });
