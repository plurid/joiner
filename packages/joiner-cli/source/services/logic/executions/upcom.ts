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
const upcomExecution = async (
    packageName: string,
    options: ExecutionOptions,
) => {
    await updateCommand(packageName, options);
    await patchCommand(packageName, options.configuration, 'patch');
    await commitCommand(packageName, options.configuration);
}
// #endregion module



// #region exports
export {
    upcomExecution,
};
// #endregion exports
