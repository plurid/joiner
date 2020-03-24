import {
    parseConfigurationFile,
} from '../services/logic/configuration';



const runCommand = async (
    packageName: string,
    command: string[],
) => {
    const configurationData = await parseConfigurationFile();
    if (!configurationData) {
        return;
    }

    const safePackageName = packageName.toLowerCase();

    const {
        packages,
    } = configurationData;

    if (safePackageName === 'all') {
        // TOOD
        // run command on all packages
        return;
    }

    for (const codePackage of packages) {
        if (typeof codePackage === 'string') {
            if (codePackage === packageName) {
                // run command
                return;
            }
            continue;
        }

        if (codePackage.name === packageName) {
            // run command;
        }
    }
}


export default runCommand;
