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
        upcomExecution,
    } from '~services/logic/executions/upcom';

    import Batcher from '~objects/Batcher';
    // #endregion external
// #endregion imports



// #region module
const upcomCommand = async (
    packageName: string,
    options: ExecutionOptions,
) => {
    const {
        batch,
        parallel,
        configuration,
    } = options;

    if (parallel) {
        const configurationData = await parseConfigurationFile(configuration);
        if (!configurationData) {
            return;
        }

        const resolvedPackage = resolvePackage(packageName, configurationData);
        if (!resolvedPackage) {
            return;
        }

        const batcher = new Batcher(
            resolvedPackage,
            batch,
            'upcom',
            {},
        );

        await batcher.run();

        return;
    }

    console.log(`\n\t---------------`);
    console.log(`\tUpcomishing ${packageName}...`);

    await upcomExecution(
        packageName,
        options,
    );

    console.log(`\n\tUpcomished ${packageName}.`);
    console.log(`\t---------------\n`);
}
// #endregion module



// #region exports
export default upcomCommand;
// #endregion exports
