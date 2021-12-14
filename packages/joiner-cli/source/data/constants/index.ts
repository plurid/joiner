// #region imports
    // #region libraries
    import os from 'os';
    import path from 'path';
    // #endregion libraries
// #endregion imports



// #region module
const homeDirectory = os.homedir();

export const JOINER_CONFIGURATION_FILE = '.joiner.config.deon';
export const joinerConfigurationPath = path.join(
    homeDirectory,
    JOINER_CONFIGURATION_FILE,
);


export const JOINER_CLI_VERSION = '#JOINER_CLI_VERSION';


export const MANUAL_JOINER = 'https://manual.plurid.com/joiner';


export const JOINER_DASHBOARD_PORT = 10100;
// #endregion module
