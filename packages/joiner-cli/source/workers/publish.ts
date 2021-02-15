// #region imports
    // #region libraries
    import {
        workerData,
        parentPort,
    } from 'worker_threads';
    // #endregion libraries


    // #region external
    import {
        publishExecution,
    } from '~services/logic/executions/publish';
    // #endregion external
// #endregion imports



// #region module
const main = () => {
    if (!parentPort) {
        return;
    }

    parentPort.postMessage('Publish Worker Started');

    publishExecution(
        workerData.configPackage,
    );
}


main();
// #endregion module
