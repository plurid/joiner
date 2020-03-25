import path from 'path';
import {
    promises as fs,
} from 'fs';

import {
    fileExists,
} from '../services/utilities';



const initializeCommand = async () => {
    const joinerPath = path.join(process.cwd(), 'joiner.yaml');

    const joinerContent = `yarnWorkspace: false
packageManager: yarn
packagePublisher: npm

# uncomment and add paths to packages
packages:
  # - /path/to/package
  # - /path/to/multiple-packages/*

commitCombine: false
commitRoot: '/path/to/root'
commitDivider: ' > '
commitMessage: 'setup: package'
`;

    if (!await fileExists(joinerPath)) {
        await fs.writeFile(joinerPath, joinerContent);
    } else {
        console.log(`\n\tJoiner already initialized. File 'joiner.yaml' exists in path:\n\n\t${process.cwd()}\n`);
    }
}



export default initializeCommand;
