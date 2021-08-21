import {SubmissionAnswerInterface} from './SubmissionAnswerInterface';

export interface SubmissionState {
  data: SubmissionInterface[];
  loading: boolean;
  selectedSubmission: SubmissionAnswerInterface | null;
}

export interface SubmissionInterface {
  id: string;
  form_id: string;
  ip: string;
  created_at: string;
  updated_at: string;
  status: string;
  new: string;
  answers: SubmissionAnswerInterface[];
}
