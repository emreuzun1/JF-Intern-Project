import {QuestionInterface} from './QuestionInterface';
import {SubmissionAnswerInterface} from './SubmissionAnswerInterface';

export interface ISubmissionEdit {
  answer?: SubmissionAnswerInterface | null;
  question: QuestionInterface;
  onPress: (qid: number, values: any, name?: boolean) => void;
}
