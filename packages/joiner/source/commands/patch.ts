import {
    parseConfigurationFile,
} from '../services/logic/configuration';



const patchCommand = async (
    packageName: string,
) => {
    const configurationData = await parseConfigurationFile();
    if (!configurationData) {
        return;
    }

}


export default patchCommand;
