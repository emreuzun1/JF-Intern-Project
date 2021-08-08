import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
    Login: { isLogged: boolean },
    Form: undefined,
    Submission: { id: string }
}