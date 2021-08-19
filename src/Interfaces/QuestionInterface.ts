export interface QuestionPayload {
  apikey: string;
  id: string;
}

export interface QuestionAction {
  type: string;
  payload: QuestionPayload;
}

export interface DataState {
  data: QuestionType[];
}

export interface QuestionType {
  headerType: string;
  name: string;
  qid: number;
  text: string;
  type: string;
  valid: true;
}
