import {ColorInterface} from '../Interfaces/ColorInterface';

export type RootStackParamList = {
  Login: {isLogged: boolean};
  Form: undefined;
  Submission: {id: string; title: string; color: ColorInterface};
  SignUp: undefined;
};
