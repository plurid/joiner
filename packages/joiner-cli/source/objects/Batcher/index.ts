// #region imports
    // #region external
    import {
        Package,
    } from '~data/interfaces';


    import {
        generateBatches,
    } from '~services/logic/batches';

    import {
        runWorker,
    } from '~services/logic/worker';
    // #endregion external
// #endregion imports



// #region module
class Batcher<D> {
    private packages: Package[];
    private batch: number;
    private workerName: string;
    private workerData: D;


    constructor(
        packages: Package[],
        batch: number,
        workerName: string,
        workerData: D,
    ) {
        this.packages = packages;
        this.batch = batch;
        this.workerName = workerName;
        this.workerData = workerData;
    }


    public async run() {
        const batches = generateBatches(
            this.packages,
            this.batch,
        );

        for (const batchPackages of batches) {
            const promises: Promise<any>[] = [];

            for (const configPackage of batchPackages) {
                const resolving: Promise<any> = runWorker<any>(
                    this.workerName,
                    {
                        configPackage,
                        ...this.workerData,
                    },
                );
                promises.push(resolving);
            }

            await Promise.all(promises);
        }
    }
}
// #endregion module



// #region exports
export default Batcher;
// #endregion exports
