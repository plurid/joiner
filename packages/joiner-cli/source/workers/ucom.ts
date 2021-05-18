// #region imports
    // #region libraries
    import {
        workerData,
        parentPort,
    } from 'worker_threads';
    // #endregion libraries


    // #region external
    import {
        ucomExecution,
    } from '~services/logic/executions/ucom';
    // #endregion external
// #endregion imports



// #region module
const main = () => {
    if (!parentPort) {
        return;
    }

    parentPort.postMessage('Ucom Worker Started');

    ucomExecution(
        workerData.packageName,
        workerData.options,
    );
}


main();
// #endregion module
