export interface ConfigurationFile {
    yarnWorkspace: boolean;
    packages: Package[];
    commitCombine: boolean;
    commitRoot: string;
    commitDivider: string;
    commitMessage: string;
}


export interface Package {
    name: string;
    path: string;
    language?: 'javascript' | 'typescript';
}
