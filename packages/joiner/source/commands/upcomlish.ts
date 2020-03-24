import {
    Package,
} from '../data/interfaces';

import {
    parseConfigurationFile,
} from '../services/logic/configuration';

import resolvePackage from '../services/logic/resolvePackage';



const upcomlishCommand = async (
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
            await upcomlishLogic(configPackage);
        }
        return;
    }

    await upcomlishLogic(resolvedPackage);
}


const upcomlishLogic = async (
    configPackage: string | Package,
) => {
    console.log(configPackage);
}


export default upcomlishCommand;
