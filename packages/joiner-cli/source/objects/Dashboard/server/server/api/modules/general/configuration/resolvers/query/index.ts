// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';

    import {
        Configurations,
    } from '#server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    getConfigurations: (
        _: any,
        __: any,
        context: Context,
    ) => Configurations.Query.getConfigurations(
        context,
    ),
};
// #endregion exports
