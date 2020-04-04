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
} from './packages';



export const parseConfigurationFile = async (
    configurationFile: string,
) => {
    try {
        const configurationFilepath = path.join(process.cwd(), configurationFile);
        const configurationFileData = await fs.readFile(configurationFilepath, 'utf-8');
        const parsedData = yaml.safeLoad(configurationFileData);
        return await handleParsedConfigurationFile(parsedData);
    } catch {
        console.log(`\n\tConfiguration file required.\n\n\tCheck the file '${configurationFile}' exists on the rootpath:\n\t${process.cwd()}\n`);
        return;
    }
}


export const handleParsedConfigurationFile = async (
    parsedData: any,
): Promise<ConfigurationFile | undefined> => {
    const packages = await locatePackages(parsedData);

    const yarnWorkspace = parsedData.yarnWorkspace ?? false;

    const commitCombine = parsedData.commit?.combine ?? false;
    const commitRoot = parsedData.commit?.root ?? '';
    const commitFullFolder = parsedData.commit?.fullFolder ?? false;
    const commitDivider = parsedData.commit?.divider ?? ' > ';
    const commitMessage = parsedData.commit?.message ?? 'setup: package';

    const runFrom = parsedData.runFrom ?? process.cwd();

    if (packages.length === 0 && !yarnWorkspace) {
        console.log(`\n\tPackages required to be specified in the 'joiner.yaml' file.\n`);
        return;
    }

    const configurationFile: ConfigurationFile = {
        yarnWorkspace,
        packages,
        package: {
            manager: 'yarn',
            publisher: 'npm'
        },
        commit: {
            engine: 'git',
            combine: commitCombine,
            root: commitRoot,
            fullFolder: commitFullFolder,
            divider: commitDivider,
            message: commitMessage,
        },
        runFrom,
    };

    return configurationFile;
}
