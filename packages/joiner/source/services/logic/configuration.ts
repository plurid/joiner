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
    const commitRoot = typeof parsedData.commitRoot === 'string'
        ? parsedData.commitRoot
        : '';
    const commitDivider = typeof parsedData.commitDivider === 'string'
        ? parsedData.commitDivider
        : ' > ';
    const commitMessage = typeof parsedData.commitMessage === 'string'
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
    console.log(configurationFile);

    return configurationFile;
}
