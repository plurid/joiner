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
    configurations: async (
        _: any,
        __: any,
        context: Context,
    ) => {
        const query = await Configurations.Query.getConfigurations(
            context,
        );

        if (!query.status) {
            return [];
        }

        return query.data;
    },
};
// #endregion exports
