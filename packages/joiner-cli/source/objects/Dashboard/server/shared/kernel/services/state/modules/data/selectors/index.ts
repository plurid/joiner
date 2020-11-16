// #region imports
    // #region external
    import {
        AppState,
    } from '../../../store';
    // #endregion external
// #endregion imports



// #region module
const getID = (state: AppState) => state.data.id;



const selectors = {
    getID,
};
// #endregion module



// #region exports
export default selectors;
// #endregion exports
