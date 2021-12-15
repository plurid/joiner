// #region imports
    // #region external
    import * as Types from '../types';
    // #endregion external
// #endregion imports



// #region module
const initialState: Types.State = {
    id: '',
    configurations: [],
    logs: [
        {
            id: 'one',
            package: 'name',
            command: 'run',
            startAt: 0,
            finishedAt: 0,
            data: [
                'started at 12/15/2021, 10:49:55 AM',
                '',
                '',
                '    Patching version for package global...',
                '    global version patched to version 0.0.1.',
                '',
                '',
                'finished at 12/15/2021, 10:49:56 AM',
            ],
        },
    ],
};
// #endregion module



// #region exports
export default initialState;
// #endregion exports
