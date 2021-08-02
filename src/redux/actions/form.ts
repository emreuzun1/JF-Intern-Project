import * as type from '../actionTypes';

export function getForm(apikey: string) {
    return {
        type : type.USER_FORMS_REQUEST,
        payload : {
            apikey
        }
    }
}

