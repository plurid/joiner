// #region imports
    // #region libraries
    import {
        execSync,
    } from 'child_process';
    // #endregion libraries


    // #region external
    import {
        Package,
    } from '~data/interfaces';

    import {
        parseConfigurationFile,
    } from '~services/logic/configuration';

    import {
        resolvePackage,
    } from '~services/logic/packages';
    // #endregion external
// #endregion imports



// #region module
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
    configPackage: Package,
    command: string[],
) => {
    const executableCommand = command.join(' ');

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
// #endregion module



// #region exports
export default runCommand;
// #endregion exports
