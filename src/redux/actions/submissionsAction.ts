import * as type from '../actionTypes';

export function getSubmissions(apikey: string, id: string) {
  return {
    type: type.FORM_SUBMISSION_REQUEST,
    payload: {
      apikey,
      id,
    },
  };
}

export function postSubmission(
  apikey: string,
  id: string,
  qid: number,
  values: any,
  name?: boolean,
) {
  return {
    type: type.FORM_SUBMISSIONPOST_REQUEST,
    payload: {
      apikey,
      id,
      qid,
      values,
      name,
    },
  };
}

export function selectSubmission(id: string, submission: any) {
  return {
    type: type.SUBMISSION_SELECT,
    payload: {
      id,
      submission,
    },
  };
}

export function resetSubmissions() {
  return {
    type: type.RESET_SUBMISSIONS,
  };
}
