export interface IActionInterface {
    type: string;
    payload: any;
}

export type IActionType = (
    action: IActionInterface
) => void;

export interface IState {
    auth: any,
    form: any,
    submissions : any
}