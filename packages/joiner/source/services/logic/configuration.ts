import {
    promises as fs,
} from 'fs';
import path from 'path';

import yaml from 'js-yaml';

import Deon, {
    DEON_FILENAME_EXTENSION,
} from '@plurid/deon';

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
        const configurationFilepath = configurationFile.startsWith('/')
            ? configurationFile
            : path.join(process.cwd(), configurationFile);
        const configurationFileData = await fs.readFile(configurationFilepath, 'utf-8');

        const extension = path.extname(configurationFile);

        if (extension === DEON_FILENAME_EXTENSION) {
            const deon = new Deon();
            const data = await deon.parse(configurationFileData);
            return await handleParsedConfigurationFile(
                data,
                configurationFilepath,
            );
        }

        const parsedData = yaml.safeLoad(configurationFileData);

        return await handleParsedConfigurationFile(
            parsedData,
            configurationFilepath,
        );
    } catch (error) {
        console.log(`\n\tConfiguration file required.\n\n\tCheck the file '${configurationFile}' exists on the rootpath:\n\t${process.cwd()}\n`);
        return;
    }
}


export const handleParsedConfigurationFile = async (
    parsedData: any,
    configurationFilepath: string,
): Promise<ConfigurationFile | undefined> => {
    const yarnWorkspace = typeof parsedData.yarnWorkspace === 'boolean'
        ? parsedData.yarnWorkspace
        : parsedData.yarnWorkspace === 'true';

    const packageManager = parsedData.package?.manager ?? 'yarn';
    const packagePublisher = parsedData.package?.publisher ?? 'npm';
    const packageIgnore = parsedData.package?.ignore ?? [];

    const commitEngine = parsedData.commit?.engine ?? 'git';
    const commitCombine = typeof parsedData.commit?.combine === 'boolean'
        ? parsedData.commit?.combine
        : parsedData.commit?.combine === 'true';
    const commitRoot = parsedData.commit?.root ?? '';
    const commitFullFolder = typeof parsedData.commit?.fullFolder === 'boolean'
        ? parsedData.commit?.fullFolder
        : parsedData.commit?.fullFolder === 'true';
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
        console.log(`\n\tPackages required to be specified in the 'joiner' configuration file.\n`);
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
