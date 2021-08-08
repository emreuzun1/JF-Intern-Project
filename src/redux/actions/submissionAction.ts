import * as type from '../actionTypes';

export function getSubmissions(apikey: string, id: string) {
    return {
        type: type.FORM_SUBMISSION_REQUEST,
        payload: {
            apikey,
            id
        }
    }
}
