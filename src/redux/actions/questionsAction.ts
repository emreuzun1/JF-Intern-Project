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

export function filterQuestions(q: any) {
  return {
    type: type.FORM_QUESTIONS_FILTER,
    payload: {
      q: q,
    },
  };
}
