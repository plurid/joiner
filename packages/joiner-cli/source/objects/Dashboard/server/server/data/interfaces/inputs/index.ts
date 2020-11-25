// #region module
export interface InputOf<T> {
    input: T;
}


export interface InputValueString {
    value: string;
}


export interface InputQuery {
    count?: number;
    start?: string;
}


export interface InputExecuteCommand {
    configurationID: string;
    command: string;
    package: string;
}
// #endregion module
