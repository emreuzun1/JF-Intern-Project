import {createSelector} from 'reselect';
import {IState} from '../../Interfaces/actionInterface';
import * as _ from 'lodash';
import {FormInterface} from '../../Interfaces/FormsInterface';
import {SubmissionInterface} from '../../Interfaces/SubmissionInterface';
import {QuestionInterface} from '../../Interfaces/QuestionInterface';

const getQuestions = (state: IState) => state.questions.data;
const getSubmissionsState = (state: IState) => state.submissions.data;
const getFormsState = (state: IState) => state.form.data;
const getVisibleQuestionsFromState = (state: IState) =>
  state.questions.visibleQuestions;

export const getActiveForms = createSelector(getFormsState, data => {
  return data
    ? data.filter((item: FormInterface) => item.status === 'ENABLED')
    : [];
});

export const getActiveSubmissions = createSelector(
  getSubmissionsState,
  data => {
    return data.filter((item: SubmissionInterface) => item.status === 'ACTIVE');
  },
);

const supportedTitles = [
  'control_head',
  'control_fullname',
  'control_email',
  'control_phone',
  'control_dropdown',
  'control_textbox',
  'control_textarea',
];

export const getOrderedTitles = createSelector(getQuestions, data => {
  const filtered = Object.values(data).filter(
    (question: QuestionInterface) =>
      supportedTitles.indexOf(question.type) > -1,
  );
  return filtered.sort(
    (a: QuestionInterface, b: QuestionInterface) => a.order - b.order,
  );
});

const supportedQuestions = [
  'control_fullname',
  'control_email',
  'control_phone',
  'control_dropdown',
  'control_textbox',
  'control_textarea',
  'control_radio',
];

export const getOrderedQuestions = createSelector(getQuestions, data => {
  const filtered = Object.values(data).filter(
    (question: QuestionInterface) =>
      supportedQuestions.indexOf(question.type) > -1,
  );
  return filtered.sort(
    (a: QuestionInterface, b: QuestionInterface) => a.order - b.order,
  );
});

export const getVisibleQuestions = createSelector(
  [getVisibleQuestionsFromState, getOrderedQuestions],
  (visibleQuestions, orderedQuestions) => {
    const filtered = Object.values(orderedQuestions).filter(
      (question: QuestionInterface) =>
        visibleQuestions.indexOf(question.qid) > -1,
    );
    return filtered;
  },
);

export const getOrderedAnswers = createSelector(
  [getActiveSubmissions, getVisibleQuestions],
  (submissions, questions) => {
    return _.memoize((submissionID: string) => {
      const submission: SubmissionInterface | undefined = submissions.find(
        (s: SubmissionInterface) => s.id === submissionID,
      );
      const answers = questions.map((q: any) => submission!.answers[q.qid]);
      return answers;
    });
  },
);
