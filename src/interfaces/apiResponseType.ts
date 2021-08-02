export interface IContent {
  username: string;
  name: string;
  email: string;
  website: string;
  time_zone: string;
  account_type: string;
  status: string;
  created_at: string;
  updated_at: string;
  usage: string;
  industry: string;
  securityAnswer: string;
  company: string;
  securityQuestion: string;
  avatarUrl: string;
  appKey: string;
}
export interface ILoginResponseType {
  responseCode: number;
  message: string;
  content: IContent;
}
