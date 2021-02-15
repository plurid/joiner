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

    const resolvedPackage = resolvePackage(packageName, configurationData);
    if (!resolvedPackage) {
        return;
    }

    if (parallel) {
        const batches = generateBatches(
            resolvedPackage,
            batch,
        );

        // run logic in worker
        for (const batchPackages of batches) {
            for (const configPackage of batchPackages) {
                runWorker(
                    'run',
                    {
                        configPackage,
                        command,
                    },
                );
            }
        }

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
