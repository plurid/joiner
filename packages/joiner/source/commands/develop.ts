import {
    parseConfigurationFile,
} from '../services/logic/configuration';

import DevelopmentServer from '../objects/DevelopmentServer';



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


export default developCommand;
