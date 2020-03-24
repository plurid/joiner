import {
    Package,
} from '../data/interfaces';

import {
    parseConfigurationFile,
} from '../services/logic/configuration';

import resolvePackage from '../services/logic/resolvePackage';



const runCommand = async (
    packageName: string,
    command: string[],
) => {
    const configurationData = await parseConfigurationFile();
    if (!configurationData) {
        return;
    }

    const resolvedPackage = resolvePackage(packageName, configurationData);
    if (!resolvedPackage) {
        return;
    }

    if (Array.isArray(resolvedPackage)) {
        for (const configPackage of resolvedPackage) {
            await runLogic(configPackage, command);
        }
        return;
    }

    await runLogic(resolvedPackage, command);
}


const runLogic = async (
    configPackage: string | Package,
    command: string[],
) => {
    console.log(configPackage);
    console.log(command);
}


export default runCommand;
