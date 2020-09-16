import {
    execSync,
} from 'child_process';

import {
    Package,
    ConfigurationFile,
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
        console.log(`\n\tNo configuration data in the configuration file ${configurationFile}.\n`);
        return;
    }

    const resolvedPackage = resolvePackage(packageName, configurationData);
    if (!resolvedPackage) {
        console.log(`\n\tNo package ${packageName}.\n`);
        return;
    }

    const registeredCommands = Object.keys(configurationData.commands);
    for (const commandName of commandNames) {
        if (!registeredCommands.includes(commandName)) {
            console.log(`\n\tNo command ${commandName}.\n`);
            return;
        }
    }

    for (const configPackage of resolvedPackage) {
        await runLogic(
            configPackage,
            commandNames,
            configurationData,
        );
    }
}


const runLogic = async (
    configPackage: Package,
    commandNames: string[],
    configurationData: ConfigurationFile,
) => {
    for (const commandName of commandNames) {
        const executableCommandData = configurationData.commands[commandName];
        const executableCommand = executableCommandData.join(' ');

        console.log(`\n\tRunning command '${executableCommand}' in:\n\t${configPackage.path}\n`);
        const startTime = Date.now();

        execSync(
            executableCommand,
            {
                cwd: configPackage.path,
                stdio: 'inherit',
            },
        );

        const endTime = Date.now();
        const commandTime = (endTime - startTime)/1000;
        console.log(`\n\tCommand\n\n\t\t${executableCommand}\n\n\tran in ${commandTime} seconds.\n`);
    }
}


export default commandCommand;
