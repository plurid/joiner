// #region imports
    // #region libraries
    import program from 'commander';
    // #endregion libraries


    // #region external
    import {
        ExecutionOptions,
    } from '~data/interfaces';

    import {
        getDefaultConfigurationFilepath,
    } from '~services/logic/configuration';
    // #endregion external
// #endregion imports



// #region module
const resolveExecutionOptions = async (
    prg: program.CommanderStatic,
) => {
    const options = prg.opts();

    const {
        parallel,
        batch,
        configuration,
    } = options;

    const resolvedConfiguration = configuration
        || await getDefaultConfigurationFilepath();

    const executionOptions: ExecutionOptions = {
        configuration: resolvedConfiguration,
        parallel,
        batch: parseInt(batch) || 10,
    };

    return executionOptions;
}
// #endregion module



// #region exports
export {
    resolveExecutionOptions,
};
// #endregion exports
