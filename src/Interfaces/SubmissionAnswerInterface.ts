export type SubmissionAnswerInterface = {
  answer:
    | {
        prefix?: string;
        first: string;
        middle?: string;
        last: string;
        suffix?: string;
      }
    | {answer: string};
  text: string;
  prettyFormat: string | undefined;
  order: number;
  type: string;
};
