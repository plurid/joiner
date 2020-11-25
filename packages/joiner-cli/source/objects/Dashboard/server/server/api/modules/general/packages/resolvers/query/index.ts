// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';

    import {
        Packages,
    } from '#server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    getPackages: (
        _: any,
        __: any,
        context: Context,
    ) => Packages.Query.getPackages(
        context,
    ),
};
// #endregion exports
