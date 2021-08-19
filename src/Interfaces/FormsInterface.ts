export type FormType = {
  responseCode: string;
  message: string;
  content: {};
  valid: true;
};

export interface FormInterface {
  id: string;
  username: string;
  title: string;
  height: string;
  url: string;
  status: string;
  created_at: string;
  updated_at: string;
  new: string;
  count: string;
  valid: true;
}

export interface FormState {
  data: FormInterface[];
  loading: boolean;
}
