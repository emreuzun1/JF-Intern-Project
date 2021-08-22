import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../Navigation/types';

type SubmissionProps = StackNavigationProp<RootStackParamList, 'Submission'>;
type SubmissionRootProp = RouteProp<RootStackParamList, 'Submission'>;

export interface SubmissionPageProps {
  navigation: SubmissionProps;
  route: SubmissionRootProp;
  appKey: string;
  loading: boolean;
  selectedSubmission: any;
  getSubmissions: (appkey: string, id: string) => void;
  requestQuestions: (appkey: string, id: string) => void;
  selectSubmission: (id: string, submission: any) => void;
  editSubmission: (
    apikey: string,
    id: string,
    qid: number,
    values: any,
    name?: boolean,
  ) => void;
  postNewSubmission: (appkey: string, id: string, data: any) => void;
  resetQuestions: () => void;
  resetSubmissions: () => void;
  resetSelectedSubmission: () => void;
  deleteSubmission: (apikey: string, submissionId: string) => void;
}
