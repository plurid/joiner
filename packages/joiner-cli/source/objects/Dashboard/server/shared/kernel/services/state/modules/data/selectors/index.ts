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



const selectors = {
    getID,
    getConfigurations,
};
// #endregion module



// #region exports
export default selectors;
// #endregion exports
