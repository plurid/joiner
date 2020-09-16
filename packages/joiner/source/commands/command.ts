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



const commandCommand = async (
    packageName: string,
    commandNames: string[],
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
        await runLogic(
            configPackage,
            commandNames,
        );
    }
}


const runLogic = async (
    configPackage: Package,
    commandNames: string[],
) => {
    // const executableCommand = commandNames.join(' ');

    // console.log(`\n\tRunning command '${executableCommand}' in:\n\t${configPackage.path}\n`);
    // const startTime = Date.now();

    // execSync(
    //     executableCommand,
    //     {
    //         cwd: configPackage.path,
    //         stdio: 'inherit',
    //     },
    // );

    // const endTime = Date.now();
    // const commandTime = (endTime - startTime)/1000;
    // console.log(`\n\tCommand\n\n\t\t${executableCommand}\n\n\tran in ${commandTime} seconds.\n`);
}


export default commandCommand;
