// #region imports
    // #region external
    import {
        ExecutionOptions,
    } from '~data/interfaces';

    import {
        parseConfigurationFile,
    } from '~services/logic/configuration';

    import {
        resolvePackage,
    } from '~services/logic/packages';

    import {
        updateExecution,
    } from '~services/logic/executions/update';

    import Batcher from '~objects/Batcher';
    // #endregion external
// #endregion imports



// #region module
const updateCommand = async (
    packageName: string,
    options: ExecutionOptions,
) => {
    const {
        batch,
        parallel,
        configuration,
    } = options;

    const configurationData = await parseConfigurationFile(configuration);
    if (!configurationData) {
        return;
    }

    const resolvedPackage = resolvePackage(packageName, configurationData);
    if (!resolvedPackage) {
        return;
    }

    if (parallel) {
        const batcher = new Batcher(
            resolvedPackage,
            batch,
            'update',
            {
                configurationFile: configurationData,
            },
        );

        await batcher.run();

        return;
    }

    for (const configPackage of resolvedPackage) {
        await updateExecution(configPackage, configurationData);
    }
}
// #endregion module



// #region exports
export default updateCommand;
// #endregion exports
