// #region imports
    // #region libraries
    import {
        execSync,
    } from 'child_process';
    // #endregion libraries


    // #region external
    import {
        Package,
        ConfigurationFile,
    } from '~data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const commandExecution = async (
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
        const commandTime = (endTime - startTime) / 1000;
        console.log(`\n\tCommand\n\n\t\t${executableCommand}\n\n\tran in ${commandTime} seconds.\n`);
    }
}
// #endregion module



// #region exports
export {
    commandExecution,
};
// #endregion exports
