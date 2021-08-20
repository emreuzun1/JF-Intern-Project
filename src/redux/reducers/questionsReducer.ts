import produce from 'immer';
import * as type from '../actionTypes';
import {IActionInterface} from '../../Interfaces/actionInterface';
import {QuestionState} from '../../Interfaces/QuestionInterface';
interface IDraft {
  [key: string]: any;
}

const initialState: QuestionState = {
  data: [],
  visibleQuestions: [],
  inVisibleQuestions: [],
};

export default (state = initialState, action: IActionInterface) =>
  produce(state, (draft: IDraft) => {
    switch (action.type) {
      case type.FORM_QUESTIONS_SUCCESS: {
        draft.data = action.payload;
        if (draft.visibleQuestions.length === 0) {
          Object.values(action.payload).map((value: any) =>
            draft.visibleQuestions.push(value.qid),
          );
        }
        break;
      }
      case type.FORM_QUESTIONS_FILTER: {
        if (action.payload.action) {
          draft.inVisibleQuestions.push(action.payload.qid);
          const index = draft.visibleQuestions.indexOf(action.payload.qid);
          if (index > -1) {
            draft.visibleQuestions.splice(index, 1);
          }
        } else {
          draft.visibleQuestions.push(action.payload.qid);
          const index = draft.inVisibleQuestions.indexOf(action.payload.qid);
          if (index > -1) {
            draft.inVisibleQuestions.splice(index, 1);
          }
        }
        break;
      }
      case type.RESET_QUESTIONS: {
        draft.data = [];
        break;
      }
    }
  });
