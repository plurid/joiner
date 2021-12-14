// #region imports
    // #region libraries
    import {
        Command,
    } from 'commander';
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
    prg: Command,
    commandOptions: any,
) => {
    const options = prg.opts();

    const {
        configuration,
    } = options;

    const {
        parallel,
        batch,
    } = commandOptions;

    const resolvedConfiguration = configuration
        || await getDefaultConfigurationFilepath();

    const executionOptions: ExecutionOptions = {
        configuration: resolvedConfiguration,
        parallel: parallel ?? false,
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
