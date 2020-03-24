import {
    ConfigurationFile,
} from '../../data/interfaces';



const resolvePackage = (
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
        if (typeof codePackage === 'string') {
            if (codePackage === packageName) {
                return codePackage;
            }
            continue;
        }

        if (codePackage.name === packageName) {
            return codePackage;
        }
    }

    console.log(`\n\tPackage ${packageName} could not be resolved.\n`);
    return;
}


export default resolvePackage;
