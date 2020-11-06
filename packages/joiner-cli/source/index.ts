// #region imports
    // #region internal
    import cli from './cli';

    import {
        initializeCommand,
        listCommand,
        runCommand,
        commandCommand,
        updateCommand,
        patchCommand,
        commitCommand,
        publishCommand,
        ucomCommand,
        upcomCommand,
        upcomlishCommand,
        developCommand,
    } from './commands';
    // #endregion internal
// #endregion imports



// #region module
const commands = {
    initialize: initializeCommand,
    list: listCommand,
    run: runCommand,
    command: commandCommand,
    update: updateCommand,
    patch: patchCommand,
    commit: commitCommand,
    publish: publishCommand,
    ucom: ucomCommand,
    upcom: upcomCommand,
    upcomlish: upcomlishCommand,
    develop: developCommand,
};
// #endregion module



// #region exports
export {
    cli,
    commands,
};
// #endregion exports
