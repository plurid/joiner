// #region imports
    // #region external
    import updateCommand from '#commands/update';
    import patchCommand from '#commands/patch';
    import commitCommand from '#commands/commit';
    // #endregion external
// #endregion imports



// #region module
const upcomCommand = async (
    packageName: string,
    configurationFile: string,
) => {
    console.log(`\n\t---------------`);
    console.log(`\tUpcomishing ${packageName}...`);

    await updateCommand(packageName, configurationFile);
    await patchCommand(packageName, configurationFile, 'patch');
    await commitCommand(packageName, configurationFile);

    console.log(`\n\tUpcomished ${packageName}.`);
    console.log(`\t---------------\n`);
}
// #endregion module



// #region exports
export default upcomCommand;
// #endregion exports
