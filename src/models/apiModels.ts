export interface IItem {
    readonly userId?: number;
    readonly id?: number;
    title: string;
    body: string;
}

export interface IItems extends Array<IItem>{}

export interface IError {
    type: 'error' | 'success';
    message: string;
}