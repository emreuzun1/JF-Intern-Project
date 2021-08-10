import produce from 'immer';
import * as type from '../actionTypes';
import { IActionInterface } from '../../Interfaces/actionInterface';

interface IDraft {
    [key: string]: string | number | boolean,
}

const initialState = {
    data: {},
}

export default (state = initialState, action: IActionInterface) =>
    produce(state, (draft: IDraft) => {
        switch (action.type) {
            case type.FORM_QUESTIONS_SUCCESS: {
                draft.data = action.payload;
            }
        }
    })