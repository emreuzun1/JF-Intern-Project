import produce from 'immer';
import * as type from '../actionTypes';

const initialState = {
  data: [],
  loading: false,
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
      default:
        return state;
    }
  });
