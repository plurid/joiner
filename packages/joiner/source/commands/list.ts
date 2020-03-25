import {
    parseConfigurationFile,
} from '../services/logic/configuration';



const listCommand = async (
    configurationFile: string,
) => {
    const configurationData = await parseConfigurationFile(configurationFile);
    if (!configurationData) {
        return;
    }

    const {
        packages,
    } = configurationData;

    console.log(`\n\tJoiner commandable packages:\n`);
    for (const configPackage of packages) {
        console.log(`\t\t${configPackage.name}`);
        console.log(`\t\t\tpath: ${configPackage.path}\n`);
    }
    console.log(`\n`);
}


export default listCommand;
