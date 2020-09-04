import path from 'path';
import {
    promises as fs,
} from 'fs';

import {
    fileExists,
} from '../services/utilities';




const deonDefaultConfiguration = `// uncomment and add paths to packages
{
    packages [
        // /path/to/package
        // /path/to/multiple-packages/*
    ]

    package {
        manager yarn
        publisher npm
        ignore []
    }

    yarnWorkspace false

    commit {
        engine git
        combine false
        root /path/to/root
        fullFolder false
        divider ' > '
        message setup: package
    }

    runFrom ''

    development {
        watchPackages all
        serverPort 55000
        watchDirectories [
            build
            distribution
            dist
        ]
        externalPackages []
    }
}
`;

const yamlDefaultConfiguration = `---
# uncomment and add paths to packages
packages:
  # - /path/to/package
  # - /path/to/multiple-packages/*

package:
  manager: yarn
  publisher: npm
  ignore: []

yarnWorkspace: false

commit:
  engine: git
  combine: false
  root: '/path/to/root'
  fullFolder: false
  divider: ' > '
  message: 'setup: package'

runFrom: ''

development:
  watchPackages: all
  serverPort: 55000
  watchDirectories: ['build', 'distribution', 'dist']
  externalPackages: []
`;


const initializeCommand = async (
    type: string,
) => {
    const filename = type === 'deon'
        ? 'joiner.deon'
        : 'joiner.yaml';

    const joinerPath = path.join(
        process.cwd(),
        filename,
    );

    const joinerContent = type === 'deon'
        ? deonDefaultConfiguration
        : yamlDefaultConfiguration;


    if (!await fileExists(joinerPath)) {
        await fs.writeFile(
            joinerPath,
            joinerContent,
        );

        console.log(`\n\tJoiner initialized in root path:\n\n\t${process.cwd()}\n`);
    } else {
        console.log(`\n\tJoiner already initialized. File '${filename}' exists in path:\n\n\t${process.cwd()}\n`);
    }
}


export default initializeCommand;
