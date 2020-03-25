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
        if (codePackage.name.toLowerCase() === safePackageName) {
            return [codePackage];
        }
    }

    console.log(`\n\tPackage ${packageName} could not be resolved.\n`);
    return;
}


export const locatePackages = async (
    packages: any,
) => {
    if (!packages) {
        return [];
    }

    const locatedPackages: Package[] = [];

    for (const specifiedPackage of packages) {
        if (!(specifiedPackage as string).includes('/*')) {
            const packagePath = path.join(process.cwd(), specifiedPackage);
            const locatedPackage = await readPackageFile(packagePath);
            if (locatedPackage) {
                locatedPackages.push(locatedPackage);
            }
        } else {
            const packagesRoot = specifiedPackage.replace('/*', '');
            const packagesRootPath = path.join(process.cwd(), packagesRoot);

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


const readPackageFile = async (
    packagePath: string,
) => {
    try {
        const packageJSONPath = path.join(packagePath, 'package.json');
        const packageRawData = await fs.readFile(packageJSONPath, 'utf-8');
        const packageData = JSON.parse(packageRawData);

        const packageName = packageData.name || '';

        const locatedPackage: Package = {
            path: packagePath,
            name: packageName,
        };
        return locatedPackage;
    } catch (error) {
        console.log(`\n\tCould not read the package from:\n\t${packagePath}\n`);
        return;
    }
}
