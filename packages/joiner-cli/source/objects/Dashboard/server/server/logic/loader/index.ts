// #region imports
    // #region external
    import {
        readConfigurationFile,
    } from '#services/utilities';
    // #endregion external
// #endregion imports



// #region module
const loadData = async () => {
    const data = await readConfigurationFile();

    return data;
}
// #endregion module



// #region exports
export default loadData;
// #endregion exports
