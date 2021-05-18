// #region imports
    // #region external
    import {
        ExecutionOptions,
    } from '~data/interfaces';

    import updateCommand from '~commands/update';
    import patchCommand from '~commands/patch';
    import commitCommand from '~commands/commit';
    import publishCommand from '~commands/publish';
    // #endregion external
// #endregion imports



// #region module
const upcomlishExecution = async (
    packageName: string,
    options: ExecutionOptions,
) => {
    await updateCommand(packageName, options);
    await patchCommand(packageName, options.configuration, 'patch');
    await commitCommand(packageName, options.configuration);
    await publishCommand(packageName, options);
}
// #endregion module



// #region exports
export {
    upcomlishExecution,
};
// #endregion exports
