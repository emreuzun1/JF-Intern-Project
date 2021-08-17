import {createSelector} from 'reselect';
import {IState} from '../../Interfaces/actionInterface';
import * as _ from 'lodash';

const getQuestions = (state: IState) => state.questions.data;
const getSubmissionsState = (state: IState) => state.submissions.data;
const getFormsState = (state: IState) => state.form.data;

export const getActiveForms = createSelector(getFormsState, data => {
  return data.filter((item: any) => item.status === 'ENABLED');
});

export const getActiveSubmissions = createSelector(
  getSubmissionsState,
  data => {
    return data.filter((item: any) => item.status === 'ACTIVE');
  },
);

const supportedQuestions = [
  'control_fullname',
  'control_email',
  'control_phone',
  'control_dropdown',
  'control_textbox',
  'control_textarea',
];

export const getOrderedQuestions = createSelector(getQuestions, data => {
  const filtered = Object.values(data).filter(
    (question: any) => supportedQuestions.indexOf(question.type) > -1,
  );
  return filtered.sort((a: any, b: any) => a.order - b.order);
});

export const getOrderedAnswers = createSelector(
  [getActiveSubmissions, getOrderedQuestions],
  (submissions, questions) => {
    return _.memoize((submissionID: any) => {
      const submission = submissions.find((s: any) => s.id === submissionID);
      const answers = questions.map((q: any) => submission.answers[q.qid]);
      return answers;
    });
  },
);
