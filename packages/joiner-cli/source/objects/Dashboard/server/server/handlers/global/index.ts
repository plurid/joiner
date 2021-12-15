// #region imports
    // #region libraries
    import fs from 'fs';
    // #endregion libraries


    // #region external
    import {
        joinerPath,
        joinerLogsPath,
    } from '~objects/Dashboard/server/server/data/constants';

    import database from '~server/services/database';
    // #endregion external
// #endregion imports



// #region module
const setup = async () => {
    try {
        if (!fs.existsSync(joinerPath)) {
            fs.mkdirSync(joinerPath);
        }
        if (!fs.existsSync(joinerLogsPath)) {
            fs.mkdirSync(joinerLogsPath);
        }


        await database.initialize();
    } catch (error) {
        return;
    }
}
// #endregion module



// #region exports
export default setup;
// #endregion exports
