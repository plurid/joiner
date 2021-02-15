// #region imports
    // #region external
    import {
        ExecutionOptions,
    } from '~data/interfaces';

    import updateCommand from '~commands/update';
    import commitCommand from '~commands/commit';
    // #endregion external
// #endregion imports



// #region module
const ucomCommand = async (
    packageName: string,
    options: ExecutionOptions,
) => {
    console.log(`\n\t---------------`);
    console.log(`\tUcomishing ${packageName}...`);

    const {
        configuration,
    } = options;

    await updateCommand(packageName, options);
    await commitCommand(packageName, configuration);

    console.log(`\n\tUcomished ${packageName}.`);
    console.log(`\t---------------\n`);
}
// #endregion module



// #region exports
export default ucomCommand;
// #endregion exports
