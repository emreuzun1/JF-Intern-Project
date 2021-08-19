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

export function resetQuestions() {
  return {
    type: type.RESET_QUESTIONS,
  };
}

export function filterQuestions(qid: number, action: boolean) {
  return {
    type: type.FORM_QUESTIONS_FILTER,
    payload: {
      action: action,
      qid: qid,
    },
  };
}
