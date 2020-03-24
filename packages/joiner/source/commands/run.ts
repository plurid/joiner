import {
    parseConfigurationFile,
} from '../services/logic/configuration';



const runCommand = async (
    packageName: string,
    command: string[],
) => {
    const configurationData = await parseConfigurationFile();
    if (!configurationData) {
        return;
    }
}


export default runCommand;
