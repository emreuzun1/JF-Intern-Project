import {FormState} from './FormsInterface';
import {QuestionState} from './QuestionInterface';
import {SubmissionState} from './SubmissionInterface';

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
  form: FormState;
  submissions: SubmissionState;
  questions: QuestionState;
}
