// #region imports
    // #region libraries
    import {
        execSync,
    } from 'child_process';
    // #endregion libraries


    // #region external
    import {
        Package,
    } from '~data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const publishExecution = async (
    configPackage: Package,
) => {
    try {
        if (configPackage.private) {
            console.log(`\n\tPackage '${configPackage.name} is private. Did not publish.'`);
            return;
        }

        console.log(`\n\tPublishing the package '${configPackage.name}'...`);

        const publishCommand = 'npm publish';
        execSync(
            publishCommand,
            {
                cwd: configPackage.path,
                stdio: 'ignore',
            },
        );

        console.log(`\t'${configPackage.name}' published.\n`);
    } catch (error) {
        console.log(`\n\tSomething went wrong.\n`);
    }
}
// #endregion module



// #region exports
export {
    publishExecution,
};
// #endregion exports
