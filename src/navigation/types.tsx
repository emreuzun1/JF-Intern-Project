import { NavigatorScreenParams } from '@react-navigation/native';

export type Params = {
    id: string
};

export type RootStackParamList = {
    Login: undefined,
    Form: undefined,
    Submission: { id: string }
}