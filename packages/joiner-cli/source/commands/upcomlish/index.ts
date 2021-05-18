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
        upcomlishExecution,
    } from '~services/logic/executions/upcomlish';

    import Batcher from '~objects/Batcher';
    // #endregion external
// #endregion imports



// #region module
const upcomlishCommand = async (
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
            'upcomlish',
            {},
        );

        await batcher.run();

        return;
    }

    console.log(`\n\t---------------`);
    console.log(`\tUpcomlishishing ${packageName}...`);

    await upcomlishExecution(
        packageName,
        options,
    );

    console.log(`\n\tUpcomlishished ${packageName}.`);
    console.log(`\t---------------\n`);
}
// #endregion module



// #region exports
export default upcomlishCommand;
// #endregion exports
