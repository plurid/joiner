// #region imports
    // #region libraries
    import {
        workerData,
        parentPort,
    } from 'worker_threads';
    // #endregion libraries


    // #region external
    import {
        updateExecution,
    } from '~services/logic/executions/update';
    // #endregion external
// #endregion imports



// #region module
const main = () => {
    if (!parentPort) {
        return;
    }

    parentPort.postMessage('Update Worker Started');

    updateExecution(
        workerData.configPackage,
        workerData.configurationFile,
    );
}


main();
// #endregion module
