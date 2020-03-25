import path from 'path';
import {
    promises as fs,
} from 'fs';

import {
    fileExists,
} from '../services/utilities';



const initializeCommand = async () => {
    const joinerPath = path.join(process.cwd(), 'joiner.yaml');

    const joinerContent = `---
# uncomment and add paths to packages
packages:
  # - /path/to/package
  # - /path/to/multiple-packages/*

package:
  manager: yarn
  publisher: npm

yarnWorkspace: false

commit:
  engine: git
  combine: false
  root: '/path/to/root'
  fullFolder: false
  divider: ' > '
  message: 'setup: package'
`;

    if (!await fileExists(joinerPath)) {
        await fs.writeFile(joinerPath, joinerContent);

        console.log(`\n\tJoiner initialized in root path:\n\n\t${process.cwd()}\n`);
    } else {
        console.log(`\n\tJoiner already initialized. File 'joiner.yaml' exists in path:\n\n\t${process.cwd()}\n`);
    }
}


export default initializeCommand;
