// #region module
export interface JoinerConfigurationDashboard {
    pid: number | undefined;
    port: number;
}

export interface JoinerConfigurationFile {
    dashboard?: JoinerConfigurationDashboard;
    paths?: string[];
}


export interface ConfigurationFile {
    packages: Package[];
    yarnWorkspace: boolean;
    package: PackageConfiguration;
    commit: CommitConfiguration;
    runFrom: string;
    development: DevelopmentConfiguration;
    commands: Record<string, string[]>;
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
     * Paths to other packages which need to be linked/watched/updated
     * but which do not belong to the same life-cycle management
     * as the top-defined `packages`.
     */
    externalPackages: string[];

    /**
     * The packages which are targeted for development watch.
     *
     * The server will listen for file changes in the `build directory` of the `package`
     * and copy the files to the `node_modules` of all the packages which require them.
     */
    watchPackages: string[];

    /**
     * Default `['build', 'distribution', 'dist']`.
     */
    watchDirectories: string[];

    /**
     * Port for the server started with `joiner develop`. Default `55000`.
     */
    serverPort: number;
}


export interface DevelopmentWatchEventData {
    event: string;
    filename: string;
    package: Package;
}



export interface Package {
    name: string;
    path: string;
    alias: string;
    version: string;
    private: boolean;
    joinerpackage: boolean;
    language?: 'javascript' | 'typescript';
}


export interface ExecutionOptions {
    configuration: string;
    parallel: boolean;
    batch: number;
}
// #endregion module
