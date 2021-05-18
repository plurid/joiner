// #region imports
    // #region libraries
    import {
        workerData,
        parentPort,
    } from 'worker_threads';
    // #endregion libraries


    // #region external
    import {
        upcomlishExecution,
    } from '~services/logic/executions/upcomlish';
    // #endregion external
// #endregion imports



// #region module
const main = () => {
    if (!parentPort) {
        return;
    }

    parentPort.postMessage('Upcomlish Worker Started');

    upcomlishExecution(
        workerData.packageName,
        workerData.options,
    );
}


main();
// #endregion module
