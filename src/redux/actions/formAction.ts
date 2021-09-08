import * as type from '../actionTypes';

export function getForm() {
  return {
    type: type.USER_FORMS_REQUEST,
  };
}

export function setOrderType(orderType: string) {
  return {
    type: type.FORM_ORDERTYPE_REQUEST,
    payload: orderType,
  };
}

export function resetForms() {
  return {
    type: type.RESET_FORMS,
  };
}
