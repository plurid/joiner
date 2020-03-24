import {
    parseConfigurationFile,
} from '../services/logic/configuration';



const publishCommand = async (
    packageName: string,
) => {
    const configurationData = await parseConfigurationFile();
    if (!configurationData) {
        return;
    }

}


export default publishCommand;
