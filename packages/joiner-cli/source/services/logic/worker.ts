// #region imports
    // #region libraries
    import path from 'path';

    import {
        Worker,
    } from 'worker_threads';
    // #endregion libraries
// #endregion imports



// #region module
const runWorker = <D>(
    name: string,
    data: D,
) => {
    return new Promise((resolve, reject) => {
        const worker = new Worker(
            path.join(
                __dirname,
                `../distribution/worker-${name}.js`,
            ),
            {
                workerData: data,
            },
        );

        worker.on('error', reject);

        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
            }

            resolve(true);
        });
    });
}
// #endregion module



// #region exports
export {
    runWorker,
};
// #endregion exports
