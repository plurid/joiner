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
        await patchLogic(configPackage);
    }
}


const patchLogic = async (
    configPackage: Package,
) => {
    try {
        console.log(`\n\tPatching version for package ${configPackage.name}...`);

        const patchCommand = 'npm version patch --no-git-tag-version';
        execSync(
            patchCommand,
            {
                cwd: configPackage.path,
                stdio: 'ignore',
            },
        );

        console.log(`\t${configPackage.name} version patched\n`);
    } catch (error) {
        console.log(`\n\tSomething went wrong.\n`);
    }
}


export default patchCommand;
