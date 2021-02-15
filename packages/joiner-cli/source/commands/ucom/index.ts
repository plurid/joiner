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
        ucomExecution,
    } from '~services/logic/executions/ucom';

    import Batcher from '~objects/Batcher';
    // #endregion external
// #endregion imports



// #region module
const ucomCommand = async (
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
            'ucom',
            {},
        );

        await batcher.run();

        return;
    }

    console.log(`\n\t---------------`);
    console.log(`\tUcomishing ${packageName}...`);

    await ucomExecution(
        packageName,
        options,
    );

    console.log(`\n\tUcomished ${packageName}.`);
    console.log(`\t---------------\n`);
}
// #endregion module



// #region exports
export default ucomCommand;
// #endregion exports
