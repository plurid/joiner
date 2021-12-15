// #region imports
    // #region external
    import {
        AppState,
    } from '../../../store';
    // #endregion external
// #endregion imports



// #region module
const getID = (state: AppState) => state.data.id;
const getConfigurations = (state: AppState) => state.data.configurations;
const getLogs = (state: AppState) => state.data.logs;



const selectors = {
    getID,
    getConfigurations,
    getLogs,
};
// #endregion module



// #region exports
export default selectors;
// #endregion exports
