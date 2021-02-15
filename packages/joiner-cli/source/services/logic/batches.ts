// #region imports
    // #region external
    import {
        Package,
    } from '~data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const generateBatches = (
    packages: Package[],
    batch: number,
) => {
    const batchesCount = Math.ceil(packages.length / batch);
    const batches: Package[][] = [];

    for (let i = 0; i < batchesCount; i++) {
        const batchValues = packages.slice(i * batch, (i + 1) * batch);
        batches.push(batchValues);
    }

    return batches;
}
// #endregion module



// #region exports
export {
    generateBatches,
};
// #endregion exports
