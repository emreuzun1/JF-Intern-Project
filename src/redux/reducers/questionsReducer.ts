import produce from 'immer';
import * as type from '../actionTypes';
import {IActionInterface} from '../../Interfaces/actionInterface';
import {QuestionState} from '../../Interfaces/QuestionInterface';
interface IDraft {
  [key: string]: any;
}

const initialState: QuestionState = {
  data: [],
};

export default (state = initialState, action: IActionInterface) =>
  produce(state, (draft: IDraft) => {
    switch (action.type) {
      case type.FORM_QUESTIONS_SUCCESS: {
        draft.data = action.payload;
        break;
      }
      case type.FORM_QUESTIONS_FILTER: {
        console.log(action.payload.q);
        break;
      }
      case type.RESET_QUESTIONS: {
        draft.data = {};
        break;
      }
    }
  });
