import {
    Package,
} from '../data/interfaces';

import {
    parseConfigurationFile,
} from '../services/logic/configuration';

import {
    resolvePackage,
} from '../services/logic/packages';



const publishCommand = async (
    packageName: string,
    configurationFile: string,
) => {
    const configurationData = await parseConfigurationFile(configurationFile);
    if (!configurationData) {
        return;
    }

    const resolvedPackage = resolvePackage(packageName, configurationData);
    if (!resolvedPackage) {
        return;
    }

    for (const configPackage of resolvedPackage) {
        await publishLogic(configPackage);
    }
}


const publishLogic = async (
    configPackage: string | Package,
) => {
    console.log(configPackage);
}


export default publishCommand;
