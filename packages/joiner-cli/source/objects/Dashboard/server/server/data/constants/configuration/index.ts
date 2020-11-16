// #region imports
    // #region external
    import {
        DatabaseType,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
export const DATABASE_TYPE = (process.env.JOINER_DATABASE_TYPE as DatabaseType | undefined)
    || 'mongo';


export const LOG_LEVEL = process.env.JOINER_LOG_LEVEL || '7';
export const QUIET = process.env.JOINER_QUIET === 'true';

export const logLevel = QUIET
    ? 0
    : parseInt(LOG_LEVEL);


export const CUSTOM_LOGIC_USAGE = process.env.JOINER_CUSTOM_LOGIC_USAGE === 'true';


export const PRIVATE_USAGE = process.env.JOINER_PRIVATE_USAGE === 'true'
export const PRIVATE_OWNER_IDENTONYM = process.env.JOINER_PRIVATE_OWNER_IDENTONYM || '';
export const PRIVATE_OWNER_KEY = process.env.JOINER_PRIVATE_OWNER_KEY || '';
export const PRIVATE_TOKEN = process.env.JOINER_PRIVATE_TOKEN || '';


export const MONGO_USERNAME = process.env.JOINER_MONGO_USERNAME || '';
export const MONGO_PASSWORD = process.env.JOINER_MONGO_PASSWORD || '';
export const MONGO_ADDRESS = process.env.JOINER_MONGO_ADDRESS || '';
export const MONGO_CONNECTION_STRING = process.env.JOINER_MONGO_CONNECTION_STRING || '';


export const TEST_MODE = process.env.JOINER_TEST_MODE === 'true';
// #endregion module
