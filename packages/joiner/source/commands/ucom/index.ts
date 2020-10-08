// #region imports
    // #region external
    import updateCommand from '#commands/update';
    import commitCommand from '#commands/commit';
    // #endregion external
// #endregion imports



// #region module
const ucomCommand = async (
    packageName: string,
    configurationFile: string,
) => {
    console.log(`\n\t---------------`);
    console.log(`\tUcomishing ${packageName}...`);

    await updateCommand(packageName, configurationFile);
    await commitCommand(packageName, configurationFile);

    console.log(`\n\tUcomished ${packageName}.`);
    console.log(`\t---------------\n`);
}
// #endregion module



// #region exports
export default ucomCommand;
// #endregion exports
