import {
    execSync,
} from 'child_process';

import {
    Package,
} from '../data/interfaces';

import {
    parseConfigurationFile,
} from '../services/logic/configuration';

import {
    resolvePackage,
} from '../services/logic/packages';



const patchCommand = async (
    packageName: string,
    configurationFile: string,
    versionType: string,
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
        await patchLogic(
            configPackage,
            versionType,
        );
    }
}


const patchLogic = async (
    configPackage: Package,
    versionType: string,
) => {
    try {
        console.log(`\n\tPatching version for package ${configPackage.name}...`);

        const versionTypeCommand = resolveVersionType(versionType);
        const patchCommand = `npm version ${versionTypeCommand} --no-git-tag-version`;
        execSync(
            patchCommand,
            {
                cwd: configPackage.path,
                stdio: 'ignore',
            },
        );

        console.log(`\t${configPackage.name} version patched.\n`);
    } catch (error) {
        console.log(`\n\tSomething went wrong. Check the version field for '${configPackage.name}'.\n`);
    }
}


const resolveVersionType = (
    versionType: string,
) => {
    const versionTypeCommand = (
        versionType === 'major'
        || versionType === 'minor'
        || versionType === 'patch'
    )
        ? versionType
        : 'patch';
    return versionTypeCommand;
}


export default patchCommand;
