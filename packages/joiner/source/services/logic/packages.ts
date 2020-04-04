import path from 'path';
import {
    promises as fs,
} from 'fs';

import {
    ConfigurationFile,
    Package,
} from '../../data/interfaces';



export const resolvePackage = (
    packageName: string,
    configurationData: ConfigurationFile,
) => {
    const {
        packages,
    } = configurationData;

    const safePackageName = packageName.toLowerCase();

    if (
        safePackageName === 'all'
        || safePackageName === '*'
    ) {
        return packages;
    }

    for (const codePackage of packages) {
        if (
            codePackage.name.toLowerCase() === safePackageName ||
            codePackage.alias.toLowerCase() === safePackageName
        ) {
            return [codePackage];
        }
    }

    console.log(`\n\tPackage ${packageName} could not be resolved.\n`);
    return;
}


export const locatePackages = async (
    packages: any,
    yarnWorkspace: boolean,
    runFrom: string,
) => {
    // const {
    //     packages,
    //     yarnWorkspace,
    // } = parsedData;

    if (!packages && !yarnWorkspace) {
        return [];
    }

    const packagesPaths = await resolvePackagesPaths(
        packages,
        yarnWorkspace,
        runFrom,
    );

    const locatedPackages: Package[] = [];

    for (const packagePath of packagesPaths) {
        if (!(packagePath as string).includes('/*')) {
            const packageAbsolutePath = path.join(runFrom, packagePath);
            const locatedPackage = await readPackageFile(packageAbsolutePath);
            if (locatedPackage) {
                locatedPackages.push(locatedPackage);
            }
        } else {
            const packagesRoot = packagePath.replace('/*', '');
            const packagesRootPath = path.join(runFrom, packagesRoot);

            try {
                const rootFiles = await fs.readdir(packagesRootPath);

                for (const rootFile of rootFiles) {
                    const packagePath = path.join(packagesRootPath, rootFile);
                    const statistics = await fs.stat(packagePath);

                    if (statistics.isDirectory()) {
                        const locatedPackage = await readPackageFile(packagePath);
                        if (locatedPackage) {
                            locatedPackages.push(locatedPackage);
                        }
                    }
                }
            } catch (error) {
                console.log(`\n\tPackages root ${packagesRootPath} could not be resolved.\n`);
            }
        }
    }

    return locatedPackages;
}


const resolvePackagesPaths = async (
    packages: any[],
    yarnWorkspace: boolean | undefined,
    runFrom: string,
) => {
    if (!yarnWorkspace) {
        return packages;
    }

    try {
        const packageJSONPath = path.join(runFrom, 'package.json');
        const packageRawData = await fs.readFile(packageJSONPath, 'utf-8');
        const packageData = JSON.parse(packageRawData);
        const workspaces = packageData.workspaces || [];

        return workspaces;
    } catch (error) {
        console.log(`\n\tCould not read the workspaces in the package.json from:\n\t${process.cwd()}\n`);
        return [];
    }
}


const readPackageFile = async (
    packagePath: string,
) => {
    try {
        const packageJSONPath = path.join(packagePath, 'package.json');
        const packageRawData = await fs.readFile(packageJSONPath, 'utf-8');
        const packageData = JSON.parse(packageRawData);

        const packageName = packageData.name ?? '';
        const packageAlias = computePackageAlias(packageName);
        const packageVersion = packageData.version ?? '0.0.0';
        const packagePrivate = packageData.private ?? false;

        const locatedPackage: Package = {
            path: packagePath,
            name: packageName,
            alias: packageAlias,
            version: packageVersion,
            private: packagePrivate,
        };
        return locatedPackage;
    } catch (error) {
        console.log(`\n\tCould not read the package from:\n\t${packagePath}\n`);
        return;
    }
}


/**
 * Extract from the package `name` the package `alias`.
 *
 * e.g.
 *
 * `@scope/one.two.three` -> `three`
 *
 * `one-two` -> `one-two`
 *
 * @param name
 */
const computePackageAlias = (
    name: string,
) => {
    const noScope = name.replace(/@\w+\//, '');
    const split = noScope.split('.');
    const lastWord = split[split.length - 1];

    return lastWord;
}
