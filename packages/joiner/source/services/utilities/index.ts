import {
    promises as fs,
} from 'fs';



export const fileExists = async (path: string) => !!(await fs.stat(path).catch(e => false));
