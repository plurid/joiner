// #region imports
    // #region libraries
    import {
        workerData,
        parentPort,
    } from 'worker_threads';
    // #endregion libraries


    // #region external
    import {
        upcomExecution,
    } from '~services/logic/executions/upcom';
    // #endregion external
// #endregion imports



// #region module
const main = () => {
    if (!parentPort) {
        return;
    }

    parentPort.postMessage('Upcom Worker Started');

    upcomExecution(
        workerData.packageName,
        workerData.options,
    );
}


main();
// #endregion module
