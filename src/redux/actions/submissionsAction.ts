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

export function editSubmission(
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

export function postNewSubmission(apikey: string, id: string, data: any) {
  return {
    type: type.NEW_SUBMISSION_POST,
    payload: {
      apikey,
      id,
      data,
    },
  };
}

export function deleteSubmission(apikey: string, submissionId: string) {
  return {
    type: type.SUBMISSION_DELETE_REQUEST,
    payload: {
      apikey,
      submissionId,
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

export function resetSelectedSubmission() {
  return {
    type: type.RESET_SELECTEDSUBMISSION,
  };
}
