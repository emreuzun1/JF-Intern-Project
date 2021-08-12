import * as type from '../actionTypes';

export function requestQuestions(apikey: string, id: string) {
  return {
    type: type.FORM_QUESTIONS_REQUEST,
    payload: {
      apikey,
      id,
    },
  };
}
