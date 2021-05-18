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
        publishExecution,
    } from '~services/logic/executions/publish';

    import Batcher from '~objects/Batcher';
    // #endregion external
// #endregion imports



// #region module
const publishCommand = async (
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
            'publish',
            {},
        );

        await batcher.run();

        return;
    }

    for (const configPackage of resolvedPackage) {
        await publishExecution(configPackage);
    }
}
// #endregion module



// #region exports
export default publishCommand;
// #endregion exports
