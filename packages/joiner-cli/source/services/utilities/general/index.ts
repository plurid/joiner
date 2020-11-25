// #region imports
    // #region libraries
    import {
        promises as fs,
    } from 'fs';

    import path from 'path';

    import crypto from 'crypto';
    // #endregion libraries
// #endregion imports



// #region module
export const fileExists = async (
    path: string,
) => !!(await fs.stat(path).catch(e => false));


/**
 * Source: https://stackoverflow.com/a/57335271
 *
 * @param callback Function to be called.
 * @param wait Debounce time.
 */
export function debouncedCallback<A extends any[]>(
    callback: (...args: A) => void,
    wait: number,
) {
    // track args & timeout handle between calls
    let argsRef: any;
    let timeout: any;

    function cleanup() {
        if (timeout) {
            clearTimeout(timeout);
        }
    }

    return function debouncedCallback(
        ...args: A
    ) {
        // capture latest args
        argsRef = args;

        // clear debounce timer
        cleanup();

        // start waiting again
        timeout = setTimeout(() => {
            if(argsRef) {
                callback(...argsRef);
            }
        }, wait);
    };
}


export const resolveAbsolutePath = (
    value: string,
) => {
    const resolvedPath = path.isAbsolute(value)
        ? value
        : path.join(
            process.cwd(),
            value,
        );

    return resolvedPath;
}


export const hashString = (
    value: string,
) => {
    return crypto
        .createHash('sha256')
        .update(value, 'utf8')
        .digest('base64');
}
// #endregion module
