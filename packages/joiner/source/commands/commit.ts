import path from 'path';
import {
    execSync,
} from 'child_process';

import {
    ConfigurationFile,
    Package,
} from '../data/interfaces';

import {
    parseConfigurationFile,
} from '../services/logic/configuration';

import {
    resolvePackage,
} from '../services/logic/packages';



const commitCommand = async (
    packageName: string,
    configurationFile: string,
) => {
    const configurationData = await parseConfigurationFile(configurationFile);
    if (!configurationData) {
        return;
    }

    const resolvedPackage = resolvePackage(packageName, configurationData);
    if (!resolvedPackage) {
        return;
    }

    for (const configPackage of resolvedPackage) {
        await commitLogic(configPackage, configurationData);
    }
}


const commitLogic = async (
    configPackage: Package,
    configurationData: ConfigurationFile,
) => {
    try {
        console.log(`\n\tCommiting the package '${configPackage.name}'...`);

        const addCommand = 'git add .';
        execSync(
            addCommand,
            {
                cwd: configPackage.path,
                stdio: 'ignore',
            },
        );

        const {
            combine,
            root,
            fullFolder,
            divider,
            message,
        } = configurationData.commit;
        const packageFolder = path.relative(process.cwd(), configPackage.path);
        const packageFolderSplit = packageFolder.split('/');
        const packageFolderName = packageFolderSplit[packageFolderSplit.length - 1];
        const packageName = fullFolder
            ? packageFolder
            : packageFolderName;
        const commitCommandMessage = combine
            ? root + packageName + divider + message
            : message;

        const commitCommand = `git commit -m '${commitCommandMessage}'`;
        execSync(
            commitCommand,
            {
                cwd: configPackage.path,
                stdio: 'ignore',
            },
        );

        console.log(`\t'${configPackage.name}' changes commited.\n`);
    } catch (error) {
        console.log(`\n\tSomething went wrong.\n`);
    }
}


export default commitCommand;
