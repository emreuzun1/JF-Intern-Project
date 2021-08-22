import {QuestionInterface} from './QuestionInterface';

export interface ITitleEdit {
  question: QuestionInterface;
  onEdit: (qid: number, value: any) => void;
}
