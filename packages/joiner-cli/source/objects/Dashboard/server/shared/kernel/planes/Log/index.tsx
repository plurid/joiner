// #region imports
    // #region libraries
    import React from 'react';

    import { AnyAction } from 'redux';
    import { connect } from 'react-redux';
    import { ThunkDispatch } from 'redux-thunk';


    import {
        Theme,
    } from '@plurid/plurid-themes';

    import {
        PluridPlaneComponentProperty,
    } from '@plurid/plurid-react';
    // #endregion libraries


    // #region external
    import {
        JoinerLog,
    } from '~server/data/interfaces';

    import { AppState } from '~kernel-services/state/store';
    import StateContext from '~kernel-services/state/context';
    import selectors from '~kernel-services/state/selectors';
    // import actions from '~kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        StyledLog,
        StyledLogData,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface LogOwnProperties {
    plurid: PluridPlaneComponentProperty;
}

export interface LogStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateDataLogs: JoinerLog[];
}

export interface LogDispatchProperties {
}

export type LogProperties =
    & LogOwnProperties
    & LogStateProperties
    & LogDispatchProperties;


const Log: React.FC<LogProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region own
        plurid,
        // #endregion own

        // #region state
        stateGeneralTheme,
        // stateInteractionTheme,
        stateDataLogs,
        // #endregion state
    } = properties;

    const {
        id,
    } = plurid.plane.parameters;

    const log = stateDataLogs.find(log => log.id === id);
    if (!log) {
        return (<></>);
    }
    // #endregion properties


    // #region render
    return (
        <StyledLog
            theme={stateGeneralTheme}
        >
            <StyledLogData
                theme={stateGeneralTheme}
            >
                <pre>
                    {log.data.join('\n')}
                </pre>
            </StyledLogData>
        </StyledLog>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): LogStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateDataLogs: selectors.data.getLogs(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): LogDispatchProperties => ({
});


const ConnectedLog = connect(
    mapStateToProperties,
    mapDispatchToProperties,
    null,
    {
        context: StateContext,
    },
)(Log);
// #endregion module



// #region exports
export default ConnectedLog;
// #endregion exports
