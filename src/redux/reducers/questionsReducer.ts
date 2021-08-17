import produce from 'immer';
import * as type from '../actionTypes';
import {IActionInterface} from '../../Interfaces/actionInterface';
import {QuestionType} from '../../Types/QuestionType';

interface IDraft {
  [key: string]: any;
}

const initialState = {
  data: {} as QuestionType,
};

export default (state = initialState, action: IActionInterface) =>
  produce(state, (draft: IDraft) => {
    switch (action.type) {
      case type.FORM_QUESTIONS_SUCCESS: {
        draft.data = action.payload;
        break;
      }
    }
  });
