import path from 'path';
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

import checkUpdates from 'npm-check-updates';



const updateCommand = async (
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
        await updateLogic(configPackage);
    }
}


const updateLogic = async (
    configPackage: Package,
) => {
    const inThePackage = `in the package '${configPackage.name}'`;

    console.log(`\n\tChecking for updates ${inThePackage}...`);

    try {
        const updatedPackages = await checkUpdates.run({
            packageFile: path.join(configPackage.path, 'package.json'),
            silent: true,
            jsonUpgraded: true,
            upgrade: true,
            dep: 'prod,dev,peer',
        });

        if (Object.keys(updatedPackages).length > 0) {
            console.log(`\n\t'${configPackage.name}' dependencies updated:\n`);
            for (const [key, value] of Object.entries(updatedPackages)) {
                console.log(`\t\t${key}: ${value}`);
            }

            console.log(`\n\tInstalling the updates ${inThePackage}...`);
            installCommand(configPackage);
            console.log(`\tUpdates installed ${inThePackage}.\n`);
        } else {
            console.log(`\n\tNo dependencies updates ${inThePackage}.\n`);

            console.log(`\n\tInstalling the dependencies ${inThePackage}...`);
            installCommand(configPackage);
            console.log(`\tDependencies installed ${inThePackage}.\n`);
        }
    } catch (error) {
        console.log(`\n\tSomething went wrong.\n`);
    }
}


const installCommand = (
    configPackage: Package,
) => {
    const install = 'yarn install';
    execSync(
        install,
        {
            cwd: configPackage.path,
            stdio: 'ignore',
        },
    );
}


export default updateCommand;
