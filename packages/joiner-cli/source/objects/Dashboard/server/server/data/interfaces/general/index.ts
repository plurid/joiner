// #region module
export interface JoinerOwner {
    id: string;
}


export interface OwnerToken {
    token: string;
}


export interface JoinerConfiguration {
    id: string;
    path: string;
    name?: string;
    packages: string[];
}

export interface JoinerLog {
    id: string;
    package: string;
    command: string;
    startAt: number;
    finishedAt: number;
}
// #endregion module
