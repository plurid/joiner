// #region imports
    // #region libraries
    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        ConfigurationFile,
    } from '#data/interfaces';

    import {
        JoinerConfiguration,
    } from '#server/data/interfaces';

    import database from '#server/services/database';

    import {
        parseConfigurationFile,
    } from '#services/logic/configuration';

    import {
        hashString,
    } from '#services/utilities';
    // #endregion external
// #endregion imports



// #region module
const readConfiguration = async (
    configurationPath: string,
) => {
    const data = await parseConfigurationFile(configurationPath);

    return data;
}


const readConfigurations = async (
    paths: string[],
) => {
    const configurationFiles: (ConfigurationFile & {path: string})[] = [];

    for (const path of paths) {
        const data = await readConfiguration(path);
        if (data) {
            const conf = {
                ...data,
                path,
            };
            configurationFiles.push(conf);
        }
    }


    const joinerConfigurations: JoinerConfiguration[] = [];

    for (const configurationFile of configurationFiles) {
        const id = hashString(configurationFile.path);
        const path = configurationFile.path;
        const packages = configurationFile.packages.map(pkg => pkg.name);

        const joinerConfiguration: JoinerConfiguration = {
            id,
            path,
            packages,
        };
        joinerConfigurations.push(joinerConfiguration);
    }

    return joinerConfigurations;
}


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
    readConfiguration,
    readConfigurations,
    registerConfiguration,
    deregisterConfiguration,
};
// #endregion exports
