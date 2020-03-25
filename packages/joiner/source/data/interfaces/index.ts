export interface ConfigurationFile {
    packages: Package[];
    yarnWorkspace: boolean;
    package: PackageConfiguration;
    commit: CommitConfiguration;
}


export interface PackageConfiguration {
    manager: string;
    publisher: string;
}


export interface CommitConfiguration {
    engine: string;
    combine: boolean;
    root: string;
    fullFolder: boolean;
    divider: string;
    message: string;
}


export interface Package {
    name: string;
    path: string;
    language?: 'javascript' | 'typescript';
}
