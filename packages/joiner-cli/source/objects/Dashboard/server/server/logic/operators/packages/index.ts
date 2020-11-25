// #region imports
    // #region libraries
    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        JoinerPackage,
    } from '#server/data/interfaces';

    import database from '#server/services/database';
    // #endregion external
// #endregion imports



// #region module
const registerPackage = async (
    path: string,
) => {
    const id = uuid.generate();

    const joinerPackage: JoinerPackage = {
        id,
        path,
    };

    // await database.store(
    //     'package',
    //     id,
    //     joinerPackage,
    // );

    return joinerPackage;
}


const deregisterPackage = async (
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
    registerPackage,
    deregisterPackage,
};
// #endregion exports
