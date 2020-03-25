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



const runCommand = async (
    packageName: string,
    command: string[],
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
        await runLogic(configPackage, command);
    }
}


const runLogic = async (
    configPackage: string | Package,
    command: string[],
) => {
    console.log(configPackage);
    console.log(command);

    const executableCommand = command.join(' ');

    execSync(
        executableCommand,
        {
            stdio: 'inherit',
        },
    );
}


export default runCommand;
