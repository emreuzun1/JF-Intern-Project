import { latest } from 'immer/dist/internal';
import { createSelector } from 'reselect';
import { IState } from '../../interfaces/actionInterface';
import * as _ from 'lodash';

export const getActiveForms = createSelector(
    (state: IState) => state.form.data,
    data => {
        if (data !== undefined) {
            return data.filter((item: any) => item.status === "ENABLED");
        }
        return data;
    }
)

export const getActiveSubmissions = createSelector(
    (state: IState) => state.submissions.data,
    data => {
        if (data !== undefined) {
            return data.filter((item: any) => item.status === "ACTIVE");
        }
        return data;
    }
)


const filters: any = {
    control_fullname: {
        prettyFormat: '',
        text: '',
        order: '',
        icon : require('../../img/font.png')
    },
    control_email: {
        answer: '',
        text: '',
        order: '',
        icon : require('../../img/mail.png')
    },
    control_phone: {
        prettyFormat: '',
        text: '',
        order: '',
        icon : require('../../img/phone.png')
    },
    control_dropdown : {
        prettyFormat : '',
        text : '',
        order : '',
        icon : require('../../img/drop-down-list.png')
    }
}

export const getQuestionTitles = createSelector(
    (state: IState) => state.questions.data,
    data => {
        let result: any[] = [];
        var filter = filters;
        if (data !== undefined) {
            Object.keys(data).map(function (index) {
                Object.keys(filters).map(key => {
                    if (key === data[index].type) {
                        filter = _.pick(data[index], ['order', 'text'])
                        filter.icon = filters[key].icon;
                        result.push(filter);
                        result.sort((a, b) => a.order - b.order);
                    }
                });
            });
            return result;
        }
        return data;
    }
);


export const getSubmissionAnswers = createSelector(
    (state: IState) => state.submissions.data,
    data => {
        var result: any[] = [];
        if (data !== undefined) {
            console.log(data);
            for (const item in data) {
                var filter = filters;
                var tempResult: any[] = [];
                Object.keys(data[item].answers).map(function (index) {
                    Object.keys(filters).map(key => {
                        if (key === data[item].answers[index].type) {
                            filter = _.pick(data[item].answers[index], ['prettyFormat', 'text', 'order', 'answer']);
                            tempResult.push(filter);
                            tempResult.sort((a, b) => a.order - b.order);
                        }
                    })
                })
                result.push(tempResult);
            }
            return result;
        }
        return data;
    }
)