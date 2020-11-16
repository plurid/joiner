// #region imports
    // #region libraries
    import { AnyAction } from 'redux';
    import { ThunkDispatch } from 'redux-thunk';

    import {
        graphql,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        InputQuery,
    } from '#server/data/interfaces';

    import client from '#kernel-services/graphql/client';

    import {
        GET_CURRENT_OWNER,
        GET_USAGE_TYPE,
    } from '#kernel-services/graphql/query';

    import actions from '#kernel-services/state/actions';
    // #endregion external
// #endregion imports



// #region module
/**
 * Get current owner.
 *
 * @param dispatch
 */
const getCurrentOwner = async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
    const dispatchSetOwnerID: typeof actions.view.setViewOwnerID = (
        payload,
    ) => dispatch(
        actions.view.setViewOwnerID(payload),
    );

    try {
        const query = await client.query({
            query: GET_CURRENT_OWNER,
            fetchPolicy: 'no-cache',
        });

        const response = query.data.getCurrentOwner;

        if (!response.status) {
            return false;
        }

        const {
            id,
        } = graphql.deleteTypenames(response.data);

        dispatchSetOwnerID(id);

        return true;
    } catch (error) {
        return false;
    }
}


/**
 * Get current owner and return true if set.
 *
 * @param setViewUsageType
 */
const getUsageType = async (
    setViewUsageType: typeof actions.view.setViewUsageType,
) => {
    const query = await client.query({
        query: GET_USAGE_TYPE,
    });

    const response = query.data.getUsageType;

    if (response.status) {
        const usageType = response.data;
        setViewUsageType(usageType);

        switch (usageType) {
            case 'PRIVATE_USAGE':
                return 'private';
            case 'PUBLIC':
                return 'general';
            case 'CUSTOM_LOGIC':
                return 'general';
        }
    }

    return;
}
// #endregion module



// #region exports
export {
    getCurrentOwner,
    getUsageType,
};
// #endregion exports
