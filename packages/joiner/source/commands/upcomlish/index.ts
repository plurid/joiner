// #region imports
    // #region external
    import updateCommand from '../update';
    import patchCommand from '../patch';
    import commitCommand from '../commit';
    import publishCommand from '../publish';
    // #endregion external
// #endregion imports



// #region module
const upcomlishCommand = async (
    packageName: string,
    configurationFile: string,
) => {
    console.log(`\n\t---------------`);
    console.log(`\tUpcomlishing ${packageName}...`);

    await updateCommand(packageName, configurationFile);
    await patchCommand(packageName, configurationFile, 'patch');
    await commitCommand(packageName, configurationFile);
    await publishCommand(packageName, configurationFile);

    console.log(`\n\tUpcomlished ${packageName}.`);
    console.log(`\t---------------\n`);
}
// #endregion module



// #region exports
export default upcomlishCommand;
// #endregion exports
