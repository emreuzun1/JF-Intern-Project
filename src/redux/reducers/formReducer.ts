import produce from 'immer';
import * as type from '../actionTypes';
import {FormState} from '../../Interfaces/FormsInterface';

const initialState: FormState = {
  data: [],
  loading: true,
};

export default (state = initialState, action: any) =>
  produce(state, draft => {
    switch (action.type) {
      case type.USER_FORMS_REQUEST:
        draft.loading = true;
        break;
      case type.USER_FORMS_SUCCESS:
        draft.data = action.payload;
        draft.loading = false;
        break;
      case type.USER_FORMS_FAIL:
        draft.loading = false;
        break;
      case type.RESET_FORMS:
        draft.data = [];
        draft.loading = true;
        break;
      default:
        return state;
    }
  });
