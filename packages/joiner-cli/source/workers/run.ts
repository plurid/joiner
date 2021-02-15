// #region imports
    // #region libraries
    import {
        workerData,
        parentPort,
    } from 'worker_threads';
    // #endregion libraries


    // #region external
    import {
        runExecution,
    } from '~services/logic/executions/run';
    // #endregion external
// #endregion imports



// #region module
const main = () => {
    if (!parentPort) {
        return;
    }

    parentPort.postMessage('Run Worker Started');

    runExecution(
        workerData.configPackage,
        workerData.command,
    );
}


main();
// #endregion module
