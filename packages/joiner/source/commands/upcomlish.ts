import {
    parseConfigurationFile,
} from '../services/logic/configuration';



const upcomlishCommand = async (
    packageName: string,
) => {
    const configurationData = await parseConfigurationFile();
    if (!configurationData) {
        return;
    }

}


export default upcomlishCommand;
