// #region imports
    // #region external
    import {
        ExecutionOptions,
    } from '~data/interfaces';

    import updateCommand from '~commands/update';
    import patchCommand from '~commands/patch';
    import commitCommand from '~commands/commit';
    // #endregion external
// #endregion imports



// #region module
const upcomCommand = async (
    packageName: string,
    options: ExecutionOptions,
) => {
    console.log(`\n\t---------------`);
    console.log(`\tUpcomishing ${packageName}...`);

    const {
        configuration,
    } = options;

    await updateCommand(packageName, options);
    await patchCommand(packageName, configuration, 'patch');
    await commitCommand(packageName, configuration);

    console.log(`\n\tUpcomished ${packageName}.`);
    console.log(`\t---------------\n`);
}
// #endregion module



// #region exports
export default upcomCommand;
// #endregion exports
