import {SubmissionAnswerInterface} from './SubmissionAnswerInterface';

export interface ISubmissionEdit {
  answer: SubmissionAnswerInterface;
  question: any;
  onPress: (qid: number, values: any, name?: boolean) => void;
}
