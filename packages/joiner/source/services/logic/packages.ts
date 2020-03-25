import {
    ConfigurationFile,
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


export const locatePackages = (
    packages: any,
) => {
    if (!packages) {
        return [];
    }

    return [];
}
