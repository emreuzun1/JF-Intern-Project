import produce from 'immer';
import {SubmissionState} from '../../Interfaces/SubmissionInterface';
import * as type from '../actionTypes';

const initialState: SubmissionState = {
  data: [],
  loading: true,
  selectedSubmission: null,
};

export default (state = initialState, action: any) =>
  produce(state, draft => {
    switch (action.type) {
      case type.FORM_SUBMISSION_REQUEST:
        draft.loading = true;
        break;
      case type.FORM_SUBMISSION_SUCCESS:
        draft.data = action.payload;
        draft.loading = false;
        break;
      case type.FORM_SUBMISSION_FAIL:
        draft.loading = false;
        break;
      case type.SUBMISSION_SELECT:
        draft.selectedSubmission = action.payload;
        break;
      case type.RESET_SUBMISSIONS:
        draft.data = [];
        draft.loading = true;
        draft.selectedSubmission = null;
        break;
      case type.RESET_SELECTEDSUBMISSION:
        draft.selectedSubmission = null;
        break;
      default:
        return state;
    }
  });
