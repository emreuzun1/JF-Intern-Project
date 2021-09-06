import * as type from '../actionTypes';

export function getForm() {
  return {
    type: type.USER_FORMS_REQUEST,
  };
}

export function resetForms() {
  return {
    type: type.RESET_FORMS,
  };
}
