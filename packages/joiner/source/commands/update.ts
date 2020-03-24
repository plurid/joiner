import {
    Package,
} from '../data/interfaces';

import {
    parseConfigurationFile,
} from '../services/logic/configuration';

import resolvePackage from '../services/logic/resolvePackage';



const updateCommand = async (
    packageName: string,
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
            await updateLogic(configPackage);
        }
        return;
    }

    await updateLogic(resolvedPackage);
}


const updateLogic = async (
    configPackage: string | Package,
) => {
    console.log(configPackage);
}


export default updateCommand;
