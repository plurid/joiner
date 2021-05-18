// #region imports
    // #region external
    import {
        ExecutionOptions,
    } from '~data/interfaces';

    import {
        parseConfigurationFile,
    } from '~services/logic/configuration';

    import {
        resolvePackage,
    } from '~services/logic/packages';

    import {
        commandExecution,
    } from '~services/logic/executions/command';

    import Batcher from '~objects/Batcher';
    // #endregion external
// #endregion imports



// #region module
const commandCommand = async (
    packageName: string,
    commandNames: string[],
    options: ExecutionOptions,
) => {
    const {
        batch,
        parallel,
        configuration,
    } = options;

    const configurationData = await parseConfigurationFile(configuration);
    if (!configurationData) {
        console.log(`\n\tNo configuration data in the configuration file ${configuration}.\n`);
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

    if (parallel) {
        const batcher = new Batcher(
            resolvedPackage,
            batch,
            'command',
            {
                commandNames,
                configurationData,
            },
        );

        await batcher.run();

        return;
    }

    for (const configPackage of resolvedPackage) {
        await commandExecution(
            configPackage,
            commandNames,
            configurationData,
        );
    }
}
// #endregion module



// #region exports
export default commandCommand;
// #endregion exports
