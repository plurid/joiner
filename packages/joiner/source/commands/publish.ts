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
    configPackage: Package,
) => {
    try {
        console.log(`\n\tPublishing the package '${configPackage.name}'...`);

        const publishCommand = 'npm publish';
        execSync(
            publishCommand,
            {
                cwd: configPackage.path,
                stdio: 'ignore',
            },
        );

        console.log(`\t'${configPackage.name}' published.\n`);
    } catch (error) {
        console.log(`\n\tSomething went wrong.\n`);
    }
}


export default publishCommand;
