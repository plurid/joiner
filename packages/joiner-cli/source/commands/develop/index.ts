// #region imports
    // #region external
    import {
        parseConfigurationFile,
    } from '~services/logic/configuration';

    import DevelopmentServer from '~objects/Development/DevelopmentServer';
    // #endregion external
// #endregion imports



// #region module
const developCommand = async (
    configurationFile: string,
) => {
    const configurationData = await parseConfigurationFile(configurationFile);
    if (!configurationData) {
        return;
    }

    const developmentServer = new DevelopmentServer(configurationData);
    developmentServer.start();
}
// #endregion module



// #region exports
export default developCommand;
// #endregion exports
