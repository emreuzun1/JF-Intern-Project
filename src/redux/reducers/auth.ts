import produce from 'immer';
import * as type from '../actionTypes';
import {IContent} from '../../interfaces/apiResponseType';

interface IActionType {
  type: string;
  payload: any;
}

const initialState = {
  appKey: '',
  loading: false,
};

export default (state = initialState, action: IActionType) =>
  produce(state, draft => {
    switch (action.type) {
      case type.USER_LOGIN_REQUEST: {
        draft.loading = true;
        break;
      }
      case type.USER_LOGIN_SUCCESS: {
        const {appKey} = action.payload;
        draft.appKey = appKey;
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
