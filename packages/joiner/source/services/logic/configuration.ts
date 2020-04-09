import {
    promises as fs,
} from 'fs';
import path from 'path';

import yaml from 'js-yaml';

import {
    ConfigurationFile,
} from '../../data/interfaces';

import {
    locatePackages,
    resolveWatchedPackages,
} from './packages';



export const parseConfigurationFile = async (
    configurationFile: string,
) => {
    try {
        const configurationFilepath = path.join(process.cwd(), configurationFile);
        const configurationFileData = await fs.readFile(configurationFilepath, 'utf-8');
        const parsedData = yaml.safeLoad(configurationFileData);

        return await handleParsedConfigurationFile(parsedData, configurationFilepath);
    } catch {
        console.log(`\n\tConfiguration file required.\n\n\tCheck the file '${configurationFile}' exists on the rootpath:\n\t${process.cwd()}\n`);
        return;
    }
}


export const handleParsedConfigurationFile = async (
    parsedData: any,
    configurationFilepath: string,
): Promise<ConfigurationFile | undefined> => {
    const yarnWorkspace = parsedData.yarnWorkspace ?? false;

    const packageManager = parsedData.package?.manager ?? 'yarn';
    const packagePublisher = parsedData.package?.publisher ?? 'npm';
    const packageIgnore = parsedData.package?.ignore ?? [];
    console.log(packageIgnore);

    const commitEngine = parsedData.commit?.engine ?? 'git';
    const commitCombine = parsedData.commit?.combine ?? false;
    const commitRoot = parsedData.commit?.root ?? '';
    const commitFullFolder = parsedData.commit?.fullFolder ?? false;
    const commitDivider = parsedData.commit?.divider ?? ' > ';
    const commitMessage = parsedData.commit?.message ?? 'setup: package';

    const runFromData = parsedData.runFrom ?? '';
    const configurationFileDirectory = path.dirname(configurationFilepath);
    const runFrom = runFromData
        ? path.resolve(configurationFileDirectory, runFromData)
        : process.cwd();

    const packages = await locatePackages(
        parsedData.packages,
        yarnWorkspace,
        runFrom,
        packageIgnore,
    );

    const developmentExternalPackages = parsedData.development?.externalPackages ?? [];
    const developmentWatchPackages = resolveWatchedPackages(
        packages,
        parsedData.development?.watchPackages,
    );
    const developmentWatchDirectories = parsedData.development?.watchDirectories ?? ['build', 'distribution', 'dist'];
    const developmentServerPort = parsedData.development?.serverPort ?? 55000;

    if (packages.length === 0 && !yarnWorkspace) {
        console.log(`\n\tPackages required to be specified in the 'joiner.yaml' file.\n`);
        return;
    }

    const configurationFile: ConfigurationFile = {
        yarnWorkspace,
        packages,
        package: {
            manager: packageManager,
            publisher: packagePublisher,
            ignore: packageIgnore,
        },
        commit: {
            engine: commitEngine,
            combine: commitCombine,
            root: commitRoot,
            fullFolder: commitFullFolder,
            divider: commitDivider,
            message: commitMessage,
        },
        development: {
            externalPackages: developmentExternalPackages,
            watchPackages: developmentWatchPackages,
            watchDirectories: developmentWatchDirectories,
            serverPort: developmentServerPort,
        },
        runFrom,
    };

    return configurationFile;
}
