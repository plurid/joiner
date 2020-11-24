// #region imports
    // #region libraries
    import {
        promises as fs,
    } from 'fs';

    import Deon from '@plurid/deon';
    // #endregion libraries


    // #region external
    import {
        ConfigurationFile,
    } from '../../../data/interfaces';

    import {
        joinerConfigurationPath,
    } from '../../../data/constants';

    import {
        fileExists,
    } from '../general';
    // #endregion external
// #endregion imports



// #region module
const updateConfigurationFile = async (
    data: Partial<ConfigurationFile>,
) => {
    try {
        const deon = new Deon();

        const exists = await fileExists(joinerConfigurationPath);

        if (!exists) {
            await fs.writeFile(
                joinerConfigurationPath,
                '',
            );
        }

        const dataInFile = await fs.readFile(
            joinerConfigurationPath,
            'utf-8',
        );
        const deonDataInFile = await deon.parse(dataInFile);

        const newData = {
            ...deonDataInFile,
            ...data,
        };
        const newDataString = deon.stringify(newData);

        await fs.writeFile(
            joinerConfigurationPath,
            newDataString,
        );

        return true;
    } catch (error) {
        return false;
    }
}


const readConfigurationFile = async () => {
    const exists = await fileExists(joinerConfigurationPath);

    if (!exists) {
        await fs.writeFile(
            joinerConfigurationPath,
            '',
        );
        return {} as any;
    }

    const data = await fs.readFile(
        joinerConfigurationPath,
        'utf-8',
    );

    const deon = new Deon();
    const ownerData: ConfigurationFile = await deon.parse(data);

    return ownerData;
}
// #endregion module



// #region exports
export {
    readConfigurationFile,
    updateConfigurationFile,
};
// #endregion exports
