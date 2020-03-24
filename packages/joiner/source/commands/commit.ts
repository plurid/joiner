import {
    parseConfigurationFile,
} from '../services/logic/configuration';



const commitCommand = async (
    packageName: string,
) => {
    const configurationData = await parseConfigurationFile();
    if (!configurationData) {
        return;
    }

    console.log(configurationData);
}


export default commitCommand;
