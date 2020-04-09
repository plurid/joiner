export interface ConfigurationFile {
    packages: Package[];
    yarnWorkspace: boolean;
    package: PackageConfiguration;
    commit: CommitConfiguration;
    runFrom: string;
}


export interface PackageConfiguration {
    manager: string;
    publisher: string;
    ignore: string[];
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
    alias: string;
    version: string;
    private: boolean;
    language?: 'javascript' | 'typescript';
}
