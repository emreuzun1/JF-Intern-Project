export interface IActionInterface {
  type: string;
  payload: any;
  error: string;
}

export interface IActionLogout {
  type: string;
  error: string;
}

export interface IActionLoginInterface {
  type: string;
  payload: {
    email: string;
    password: string;
  };
}

export type IActionType = (action: IActionInterface) => void;

export interface IState {
  auth: any;
  form: any;
  submissions: any;
  questions: any;
}
