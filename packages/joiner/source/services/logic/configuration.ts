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
    const yarnWorkspace = typeof parsedData.yarnWorkspace === 'boolean'
        ? parsedData.yarnWorkspace
        : false;
    const packages = await locatePackages(parsedData.packages);
    const commitCombine = typeof parsedData.commitCombine === 'boolean'
        ? parsedData.commitCombine
        : false;
    const commitRoot = typeof parsedData.commitRoot === 'boolean'
        ? parsedData.commitRoot
        : '';
    const commitDivider = typeof parsedData.commitDivider === 'boolean'
        ? parsedData.commitDivider
        : ' > ';
    const commitMessage = typeof parsedData.commitMessage === 'boolean'
        ? parsedData.commitMessage
        : 'setup: package';

    if (!yarnWorkspace || packages.length === 0) {
        console.log(`\n\tPackages required to be specified in the 'joiner.yaml' file.\n`);
        return;
    }

    const configurationFile: ConfigurationFile = {
        yarnWorkspace,
        packages,
        commitCombine,
        commitRoot,
        commitDivider,
        commitMessage,
    };

    return configurationFile;
}
