// #region imports
    // #region external
    import {
        Context,
        InputOf,
        InputValueString,
        InputExecuteCommand,
    } from '#server/data/interfaces';

    import {
        Configurations,
    } from '#server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    executeCommand: (
        _: any,
        { input }: InputOf<InputExecuteCommand>,
        context: Context,
    ) => Configurations.Mutation.executeCommand(
        input,
        context,
    ),
    generateConfiguration: (
        _: any,
        { input }: InputOf<InputValueString>,
        context: Context,
    ) => Configurations.Mutation.generateConfiguration(
        input,
        context,
    ),
    obliterateConfiguration: (
        _: any,
        { input }: InputOf<InputValueString>,
        context: Context,
    ) => Configurations.Mutation.obliterateConfiguration(
        input,
        context,
    ),
};
// #endregion exports
