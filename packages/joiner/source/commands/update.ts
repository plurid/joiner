import {
    parseConfigurationFile,
} from '../services/logic/configuration';



const updateCommand = async (
    packageName: string,
) => {
    const configurationData = await parseConfigurationFile();
    if (!configurationData) {
        return;
    }

}


export default updateCommand;
