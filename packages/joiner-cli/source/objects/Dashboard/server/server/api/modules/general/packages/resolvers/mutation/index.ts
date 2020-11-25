// #region imports
    // #region external
    import {
        Context,
        InputOf,
        InputValueString,
    } from '#server/data/interfaces';

    import {
        Packages,
    } from '#server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    generatePackage: (
        _: any,
        { input }: InputOf<InputValueString>,
        context: Context,
    ) => Packages.Mutation.generatePackage(
        input,
        context,
    ),
    obliteratePackage: (
        _: any,
        { input }: InputOf<InputValueString>,
        context: Context,
    ) => Packages.Mutation.obliteratePackage(
        input,
        context,
    ),
};
// #endregion exports
