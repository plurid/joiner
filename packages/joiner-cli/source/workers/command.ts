// #region imports
    // #region libraries
    import {
        workerData,
        parentPort,
    } from 'worker_threads';
    // #endregion libraries


    // #region external
    import {
        commandExecution,
    } from '~services/logic/executions/command';
    // #endregion external
// #endregion imports



// #region module
const main = () => {
    if (!parentPort) {
        return;
    }

    parentPort.postMessage('Command Worker Started');

    commandExecution(
        workerData.configPackage,
        workerData.commandNames,
        workerData.configurationData,
    );
}


main();
// #endregion module
