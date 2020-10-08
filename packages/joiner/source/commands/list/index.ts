// #region imports
    // #region external
    import {
        parseConfigurationFile,
    } from '../../services/logic/configuration';
    // #endregion external
// #endregion imports



// #region module
const listCommand = async (
    configurationFile: string,
) => {
    const configurationData = await parseConfigurationFile(configurationFile);
    if (!configurationData) {
        return;
    }

    const {
        packages,
    } = configurationData;

    if (packages.length > 0) {
        console.log(`\n\tJoiner commandable packages:\n`);
        for (const configPackage of packages) {
            console.log(`\t\t${configPackage.name}`);
            console.log(`\t\talias: ${configPackage.alias}`);
            console.log(`\t\tpath: ${configPackage.path}\n`);
        }
    } else {
        console.log(`\n\tNo joiner commandable packages.\n`);
    }
}
// #endregion module



// #region exports
export default listCommand;
// #endregion exports
