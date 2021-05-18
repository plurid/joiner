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
        generateBatches,
    } from '~services/logic/batches';

    import {
        runWorker,
    } from '~services/logic/worker';

    import {
        runExecution,
    } from '~services/logic/executions/run';

    import Batcher from '~objects/Batcher';
    // #endregion external
// #endregion imports



// #region module
const runCommand = async (
    packageName: string,
    command: string[],
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

    const resolvedPackage = resolvePackage(
        packageName,
        configurationData,
    );
    if (!resolvedPackage) {
        return;
    }

    if (parallel) {
        const batcher = new Batcher(
            resolvedPackage,
            batch,
            'run',
            {
                command,
            },
        );

        await batcher.run();

        return;
    }

    for (const configPackage of resolvedPackage) {
        await runExecution(
            configPackage,
            command,
        );
    }
}
// #endregion module



// #region exports
export default runCommand;
// #endregion exports
