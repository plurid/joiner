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
const upcomlishCommand = async (
    packageName: string,
    options: ExecutionOptions,
) => {
    console.log(`\n\t---------------`);
    console.log(`\tUpcomlishing ${packageName}...`);

    const {
        configuration,
    } = options;

    await updateCommand(packageName, options);
    await patchCommand(packageName, configuration, 'patch');
    await commitCommand(packageName, configuration);
    await publishCommand(packageName, options);

    console.log(`\n\tUpcomlished ${packageName}.`);
    console.log(`\t---------------\n`);
}
// #endregion module



// #region exports
export default upcomlishCommand;
// #endregion exports
