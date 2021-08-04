import produce from 'immer';
import * as type from '../actionTypes';
import { IActionInterface } from '../../interfaces/actionInterface';

interface IDraft {
  [key: string]: string | number | boolean,
}

const initialState = {
  appKey: '',
  loading: false,
};

export default (state = initialState, action: IActionInterface) =>
  produce(state, (draft: IDraft) => {
    switch (action.type) {
      case type.USER_LOGIN_REQUEST: {
        draft.loading = true;
        break;
      }
      case type.USER_LOGIN_SUCCESS: {
        Object.keys(action.payload).forEach(key => {
          draft[key] = action.payload[key];
        });
        draft.loading = false;
        break;
      }
      case type.USER_LOGIN_RESTOREAPPKEY: {
        Object.keys(action.payload).forEach(key => {
          draft[key] = action.payload[key];
        });
        draft.loading = false;
        break;
      }
      case type.USER_LOGIN_FAIL: {
        draft.loading = false;
        break;
      }
      default:
        return state;
    }
  });
