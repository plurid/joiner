// #region imports
    // #region libraries
    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        JoinerConfiguration,
    } from '#server/data/interfaces';

    import database from '#server/services/database';
    // #endregion external
// #endregion imports



// #region module
const registerConfiguration = async (
    path: string,
) => {
    const id = uuid.generate();

    const joinerConfiguration: JoinerConfiguration = {
        id,
        path,
        packages: [],
    };

    // await database.store(
    //     'package',
    //     id,
    //     joinerConfiguration,
    // );

    return joinerConfiguration;
}


const deregisterConfiguration = async (
    id: string,
) => {
    try {
        // await database.obliterate(
        //     'package',
        //     id,
        // );
    } catch (error) {
        return;
    }
}
// #endregion module



// #region exports
export {
    registerConfiguration,
    deregisterConfiguration,
};
// #endregion exports
