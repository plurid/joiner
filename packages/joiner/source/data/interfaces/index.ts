export interface ConfigurationFile {
    packages: Package[];
    yarnWorkspace: boolean;
    package: PackageConfiguration;
    commit: CommitConfiguration;
    runFrom: string;
    development: DevelopmentConfiguration;
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


export interface DevelopmentConfiguration {
    /**
     * Port for the server started with `joiner develop`. Default `55000`.
     */
    serverPort: number;

    /**
     * The packages which are targeted for development watch.
     *
     * The server will listen for file changes in the `build directory` of the `package`
     * and copy the files to the `node_modules` of all the packages which require them.
     */
    watchPackages: string | string[];

    /**
     * Default `['build', 'distribution', 'dist']`.
     */
    watchDirectories: string[];
}


export interface Package {
    name: string;
    path: string;
    alias: string;
    version: string;
    private: boolean;
    language?: 'javascript' | 'typescript';
}
