// #region imports
    // #region libraries
    import path from 'path';

    import {
        execSync,
    } from 'child_process';

    import checkUpdates from 'npm-check-updates';
    // #endregion libraries


    // #region external
    import {
        Package,
        ConfigurationFile,
    } from '~data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const updateExecution = async (
    configPackage: Package,
    configurationFile: ConfigurationFile,
) => {
    const inThePackage = `in the package '${configPackage.name}'`;

    console.log(`\n\tChecking for updates ${inThePackage}...`);

    try {
        const updatedPackages = await checkUpdates({
            packageFile: path.join(configPackage.path, 'package.json'),
            silent: true,
            jsonUpgraded: true,
            upgrade: true,
            dep: 'prod,dev',
            cache: true,
        });

        if (!updatedPackages) {
            console.log(`\n\tCould not find updates ${inThePackage}...`);
            return;
        }

        if (Object.keys(updatedPackages).length > 0) {
            console.log(`\n\t'${configPackage.name}' dependencies updated:\n`);
            for (const [key, value] of Object.entries(updatedPackages)) {
                console.log(`\t\t${key}: ${value}`);
            }

            console.log(`\n\tInstalling the updates ${inThePackage}...`);
            installCommand(configPackage, configurationFile);
            console.log(`\tUpdates installed ${inThePackage}.\n`);
        } else {
            console.log(`\n\tNo dependencies updates ${inThePackage}.\n`);

            console.log(`\n\tInstalling the dependencies ${inThePackage}...`);
            installCommand(configPackage, configurationFile);
            console.log(`\tDependencies installed ${inThePackage}.\n`);
        }
    } catch (error) {
        console.log(`\n\tSomething went wrong.\n`);
    }
}


const installCommand = (
    configPackage: Package,
    configurationFile: ConfigurationFile,
) => {
    const install = `${configurationFile.package.manager} install`;
    execSync(
        install,
        {
            cwd: configPackage.path,
            stdio: 'ignore',
        },
    );
}
// #endregion module



// #region exports
export {
    updateExecution,
};
// #endregion exports
