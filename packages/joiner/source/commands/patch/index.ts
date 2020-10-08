// #region imports
    // #region libraries
    import path from 'path';

    import {
        promises as fs,
    } from 'fs';

    import {
        execSync,
    } from 'child_process';
    // #endregion libraries


    // #region external
    import {
        Package,
    } from '../../data/interfaces';

    import {
        parseConfigurationFile,
    } from '../../services/logic/configuration';

    import {
        resolvePackage,
    } from '../../services/logic/packages';
    // #endregion external
// #endregion imports




const patchCommand = async (
    packageName: string,
    configurationFile: string,
    versionType: string,
) => {
    if (packageName === '.') {
        const packageData: Package = {
            alias: '',
            joinerpackage: false,
            name: 'in the current directory',
            path: process.cwd(),
            private: false,
            version: '0.0.0',
        };
        await patchLogic(
            packageData,
            versionType,
        );
        return;
    }

    const configurationData = await parseConfigurationFile(configurationFile);
    if (!configurationData) {
        return;
    }

    const resolvedPackage = resolvePackage(packageName, configurationData);
    if (!resolvedPackage) {
        return;
    }

    for (const configPackage of resolvedPackage) {
        await patchLogic(
            configPackage,
            versionType,
        );
    }
}


const patchLogic = async (
    configPackage: Package,
    versionType: string,
) => {
    try {
        console.log(`\n\tPatching version for package ${configPackage.name}...`);

        const versionTypeCommand = resolveVersionType(versionType);
        const patchCommand = `npm version ${versionTypeCommand} --no-git-tag-version`;
        execSync(
            patchCommand,
            {
                cwd: configPackage.path,
                stdio: 'ignore',
            },
        );

        const packageJSONPath = path.join(configPackage.path, 'package.json');
        const packageJSONRawData = await fs.readFile(packageJSONPath, 'utf-8');
        const packageJSONData = JSON.parse(packageJSONRawData);
        const {
            name,
            version,
        } = packageJSONData;

        console.log(`\t${name} version patched to version ${version}.\n`);
    } catch (error) {
        console.log(`\n\tSomething went wrong. Check the version field for '${configPackage.name}'.\n`);
    }
}


const resolveVersionType = (
    versionType: string,
) => {
    const versionTypeCommand = (
        versionType === 'major'
        || versionType === 'minor'
        || versionType === 'patch'
    )
        ? versionType
        : 'patch';
    return versionTypeCommand;
}
// #endregion module



// #region exports
export default patchCommand;
// #endregion exports
