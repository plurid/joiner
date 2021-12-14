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
// #endregion module
