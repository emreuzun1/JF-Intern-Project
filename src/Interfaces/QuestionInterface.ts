export interface QuestionPayload {
  apikey: string;
  id: string;
}

export interface QuestionAction {
  type: string;
  payload: QuestionPayload;
}

export interface QuestionState {
  data: QuestionInterface[];
}

export interface QuestionInterface {
  headerType: string;
  name: string;
  qid: number;
  text: string;
  type: string;
  order: number;
  options?: string;
  confirmationHint?: string;
  sublabels?: string[] | {masked: any} | undefined;
  valid: true;
}
