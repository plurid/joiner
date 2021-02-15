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
const ucomExecution = async (
    packageName: string,
    options: ExecutionOptions,
) => {
    await updateCommand(packageName, options);
    await commitCommand(packageName, options.configuration);
}
// #endregion module



// #region exports
export {
    ucomExecution,
};
// #endregion exports
